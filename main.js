/* eslint-env node */

const electron = require("electron")
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain
const isDev = require("electron-is-dev")

const updater = require("./updater")
const logger = require("./logger")

let mainWindow

logger.init()
ipcMain.on("log-entry", (event, opts) => {
  logger.logWithType(opts.type, opts.message)
})

function createWindow () {
  logger.info("creating app window")

  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL(`file://${__dirname}/app/index.html`)
  mainWindow.webContents.openDevTools()

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
}

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
