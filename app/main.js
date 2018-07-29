/* eslint-env node */
const electron = require("electron")
const {app, BrowserWindow, ipcMain, Menu, shell} = electron
const isDev = require("electron-is-dev")
const { URL } = require("url")
const defaultMenu = require("electron-default-menu")
const updater = require("./updater")
const logger = require("./logger")

const {authorizeUser, fetchAccessToken} = require("./userAuthentication")

let mainWindow
let deepLinkURLOnReady = null

const DEFAULT_PROTOCOL_HANDLER = "x-github-classroom"

logger.init()

function createWindow () {
  logger.info("creating app window")

  const menu = defaultMenu(app, shell)
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu))

  mainWindow = new BrowserWindow({width: 1200, height: 750, titleBarStyle: "hidden"})
  const url = `file://${__dirname}/index.html`
  mainWindow.loadURL(url)

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  if (!isDev) {
    let msBetweenUpdates = 1000 * 60 * 30
    updater.start(app, msBetweenUpdates, () => {
      mainWindow.webContents.send("info", {msg: "update found"})
    }, (err) => {
      mainWindow.webContents.send("info", {msg: err})
    })
  }

  mainWindow.on("closed", function () {
    mainWindow = null
  })

  ipcMain.on("initialized", () => {
    if (deepLinkURLOnReady != null) {
      // If open-url event was fired before app was ready
      loadPopulatePage(deepLinkURLOnReady)
      deepLinkURLOnReady = null
    }
  })

  ipcMain.on("requestAuthorization", () => {
    authorizeUser(mainWindow, DEFAULT_PROTOCOL_HANDLER)
  })
}

function loadPopulatePage (assignmentURL) {
  mainWindow.webContents.send("open-url", assignmentURL)
}

app.on("open-url", function (event, urlToOpen) {
  event.preventDefault()
  let urlParams = new URL(urlToOpen).searchParams

  console.log(urlToOpen)
  console.log(urlParams)

  let isClassroomDeeplink = urlParams.has("assignment_url")
  let isOAuthDeeplink = urlParams.has("code")

  if (isClassroomDeeplink) {
    let assignmentURL = urlParams.get("assignment_url")
    if (app.isReady()) {
      loadPopulatePage(assignmentURL)
    } else {
      deepLinkURLOnReady = assignmentURL
    }
  } else if (isOAuthDeeplink) {
    const oauthCode = urlParams.get("code")
    fetchAccessToken(oauthCode)
    loadPopulatePage("")
  }
})

app.on("ready", () => {
  app.setAsDefaultProtocolClient(DEFAULT_PROTOCOL_HANDLER)
  createWindow()
})

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow()
  }
})
