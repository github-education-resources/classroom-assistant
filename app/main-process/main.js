/* eslint-env node */
const electron = require("electron")
const { app, BrowserWindow, ipcMain } = electron
const { URL } = require("url")
const log = require("electron-log")
const util = require("util")
const exec = util.promisify(require("child_process").exec)
const axios = require("axios")

// Set the default URL
axios.defaults.baseURL = __API_URL__

const updater = require("./updater")
const { initLogger } = require("./logger")
const {
  authorizeUser,
  setAccessTokenFromCode,
  loadAccessToken,
  deleteAccessToken,
} = require("./userAuthentication")
const { generateMenu } = require("./menu")
const { moveToApplicationsFolder } = require("./letsMove")

let mainWindow
let loadOnReady = null

const DEFAULT_PROTOCOL_HANDLER = "x-github-classroom"

if (require("electron-squirrel-startup")) app.exit()

initLogger()

const createWindow = () => {
  log.info("creating app window")

  // Set window toolbar options
  generateMenu()

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 750,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
    minHeight: 300,
    minWidth: 300,
  })

  // eslint-disable-next-line no-undef
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  if (__DEV__) {
    mainWindow.webContents.openDevTools()
  }

  if (!__DEV__) {
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
      await setAccessTokenFromCode(oauthCode, mainWindow)
      loadPopulatePage(assignmentURL)
    } else {
      loadOnReady = {
        assignmentURL: assignmentURL,
        code: oauthCode,
      }
    }
  }
})

app.on("ready", async () => {
  await setInstanceProtocolHandler()

  const gotTheLock = app.requestSingleInstanceLock()
  if (!gotTheLock) {
    app.quit()
    return
  }

  app.on("second-instance", (event, argv, cwd) => {
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
