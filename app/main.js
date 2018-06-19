/* eslint-env node */

const electron = require("electron")
const {app, BrowserWindow, ipcMain} = electron
const isDev = require("electron-is-dev")
const { URL } = require('url')

const updater = require("./updater")
const logger = require("./logger")
const http = require('http')


let mainWindow, authWindow

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
  if(authWindow){
    authWindow.close()
    authWindow = null
  }
  if(!mainWindow){
    createWindow()
  }
  console.log(urlToOpen)
  var parsed = new URL(urlToOpen);
  var usernames = parsed.searchParams.get("usernames").split(",")
  var urls = parsed.searchParams.get("urls").split(",")
  var title = parsed.searchParams.get("title")
  var token = parsed.searchParams.get("token")
  var type = parsed.searchParams.get("type")
  
  global.sharedObj = {usernames: usernames, urls: urls, title: title, token:token, type:type}
  console.log(global.sharedObj)
  mainWindow.webContents.send('open-url')
   
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

ipcMain.on('populate', (event, arg) => {
  console.log('populate') // prints "ping"
  authWindow = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      nativeWindowOpen: true
    }
  })
  authWindow.loadURL(arg)
  for(var i = 5000; i> 0; i--);
  console.log(authWindow.webContents.getURL)
})