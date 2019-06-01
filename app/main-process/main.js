/* eslint-env node */
const electron = require("electron")
const {app, BrowserWindow, ipcMain} = electron
const isDev = require("electron-is-dev")
const { URL } = require("url")
const log = require("electron-log")
const util = require("util")
const path = require("path")
const exec = util.promisify(require("child_process").exec)
const url = require("url")

const updater = require("./updater")
const {initLogger} = require("./logger")
const {authorizeUser, setAccessTokenFromCode, loadAccessToken, deleteAccessToken} = require("./userAuthentication")
const {generateMenu} = require("./menu")
const {moveToApplicationsFolder} = require("./letsMove")

let mainWindow
let loadOnReady = null

const DEFAULT_PROTOCOL_HANDLER = "x-github-classroom"

if (require("electron-squirrel-startup")) app.exit()

initLogger()

const createWindow = () => {
  log.info("creating app window")

  // Set window toolbar options
  generateMenu()

  mainWindow = new BrowserWindow({width: 1200, height: 750, titleBarStyle: "hidden", show: false, minHeight: 300, minWidth: 300})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "../index.html"),
    protocol: "file:",
    slashes: true
  }))

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  if (!isDev) {
    const msBetweenUpdates = 1000 * 60 * 30
    updater.start(app, msBetweenUpdates)
  }

  mainWindow.on("closed", function () {
    mainWindow = null
  })

  ipcMain.on("initialized", async () => {
    if (loadOnReady != null) {
      // If open-url event was fired before app was ready
      await setAccessTokenFromCode(loadOnReady.code, mainWindow)
      loadPopulatePage(loadOnReady.assignmentURL)
      loadOnReady = null
    }

    mainWindow.show()
  })

  ipcMain.on("requestAuthorization", () => {
    authorizeUser(mainWindow, DEFAULT_PROTOCOL_HANDLER)
  })

  ipcMain.on("deleteToken", deleteAccessToken)
}

const loadPopulatePage = (assignmentURL) => {
  mainWindow.webContents.send("open-url", assignmentURL)
}

const setInstanceProtocolHandler = async () => {
  if (process.platform === "linux") {
    const command = "xdg-settings set default-url-scheme-handler"
    const packageName = "classroom-assistant.desktop"

    // TODO: Figure out bug in setAsDefaultProtocolClient on Linux
    // Set Protocol Handler on Linux manually because of bug in Electron
    try {
      await exec(`${command} ${DEFAULT_PROTOCOL_HANDLER} ${packageName}`)
      log.info("Successfully set protocol handler on Linux.")
    } catch (e) {
      log.warn(`Failed to set Protocol Handler on Linux: ${e}`)
    }
  } else {
    app.setAsDefaultProtocolClient(DEFAULT_PROTOCOL_HANDLER)
  }

  return app.makeSingleInstance((argv) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()

      if (process.platform === "win32" || process.platform === "linux") {
        const url = argv.find(function (arg) {
          return /^x-github-classroom:\/\//.test(arg)
        })
        if (url) app.emit("open-url", null, url)
      }
    }
  })
}

app.on("open-url", async function (event, urlToOpen) {
  if (event) {
    event.preventDefault()
  }

  let assignmentURL = ""
  const urlParams = new URL(urlToOpen).searchParams
  const isClassroomDeeplink = urlParams.has("assignment_url")
  const isOAuthDeeplink = urlParams.has("code")

  if (isOAuthDeeplink) {
    const oauthCode = urlParams.get("code")

    if (isClassroomDeeplink) {
      assignmentURL = urlParams.get("assignment_url")
    }
    if (app.isReady()) {
      // TODO: Handle rejected promise
      await setAccessTokenFromCode(oauthCode, mainWindow)
      loadPopulatePage(assignmentURL)
    } else {
      loadOnReady = {
        assignmentURL: assignmentURL,
        code: oauthCode
      }
    }
  }
})

app.on("ready", async () => {
  const anotherInstanceRunning = await setInstanceProtocolHandler()

  if (anotherInstanceRunning) app.quit()

  moveToApplicationsFolder()
  loadAccessToken()
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
