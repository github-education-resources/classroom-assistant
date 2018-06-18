/* eslint-env node */

const electron = require("electron")
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const isDev = require("electron-is-dev")

const updater = require("./updater")
const logger = require("./logger")
const { URL } = require('url')

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

app.on('open-url', function(event, urlToOpen) {
   event.preventDefault();
   if(mainWindow){
      var parsed = new URL(urlToOpen);
      var usernames = parsed.searchParams.get("usernames").split(",")
      var urls = parsed.searchParams.get("urls").split(",")
      var title = parsed.searchParams.get("title")
      global.sharedObj = {usernames: usernames, urls: urls, title: title}
      console.log(global.sharedObj)
      mainWindow.webContents.send('open-url')
   }
  //  console.log(urlToOpen)
});

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
