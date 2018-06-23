/* eslint-env node */

const electron = require("electron")
const {app, BrowserWindow, ipcMain} = electron
const isDev = require("electron-is-dev")
const { URL } = require("url")

const updater = require("./updater")
const logger = require("./logger")

const {loadAssignmentRepos} = require("./assignmentLoader")

let mainWindow

logger.init()

function createWindow () {
  logger.info("creating app window")
  app.setAsDefaultProtocolClient("ghclassroom")

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
}
app.on("open-url", function (event, urlToOpen) {
  event.preventDefault()

  if (!mainWindow) {
    createWindow()
  }

  var parsed = new URL(urlToOpen)
  var assignmentURL = parsed.searchParams.get("assignment_url")

  loadAssignmentRepos(mainWindow, assignmentURL)
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

ipcMain.on("populate", (event, arg) => {
  console.log("populate") // prints "ping"
  loadAssignmentRepos(mainWindow, arg)
})
