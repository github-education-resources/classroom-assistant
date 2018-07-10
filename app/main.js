/* eslint-env node */

const electron = require("electron")
const {app, BrowserWindow, ipcMain, Menu, shell} = electron
const isDev = require("electron-is-dev")
const { URL } = require("url")
const defaultMenu = require("electron-default-menu")

const updater = require("./updater")
const logger = require("./logger")

const {authorizeUser} = require("./userAuthentication")

let mainWindow
let deepLinkURLOnReady = null

logger.init()

function createWindow () {
  logger.info("creating app window")
  app.setAsDefaultProtocolClient("x-github-classroom")

  const menu = defaultMenu(app, shell)
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu))

  mainWindow = new BrowserWindow({width: 900, height: 600})
  const url = `file://${__dirname}/index.html`
  mainWindow.loadURL(url)

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  if (!isDev) {
    var msBetweenUpdates = 1000 * 60 * 30
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
      loadPopulatePage(deepLinkURLOnReady)
    }
  })

  ipcMain.on("requestAuthorization", (e, assignmentURL) => {
    authorizeUser(mainWindow, assignmentURL)
  })
}

function loadPopulatePage (assignmentURL) {
  mainWindow.webContents.send("open-url", assignmentURL)
}

app.on("open-url", function (event, urlToOpen) {
  event.preventDefault()
  var parsedURL = new URL(urlToOpen)
  var assignmentURL = parsedURL.searchParams.get("assignment_url")
  if (app.isReady()) {
    loadPopulatePage(assignmentURL)
  } else {
    deepLinkURLOnReady = assignmentURL
  }
})

app.on("ready", createWindow)

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
