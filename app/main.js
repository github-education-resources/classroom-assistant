/* eslint-env node */

const electron = require("electron")
const {app, BrowserWindow, ipcMain, net, session} = electron
const isDev = require("electron-is-dev")
const { URL } = require('url')

const updater = require("./updater")
const logger = require("./logger")
const https = require('https')


let mainWindow, authWindow, sess

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

function openAuthWindow(desktop_url){
  console.log("open Auth window")
  authWindow = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      nativeWindowOpen: true,
      session: session.defaultSession
    }
  })
  authWindow.loadURL(desktop_url)

  authWindow.webContents.on('did-start-navigation', function(url, isInPlace, isMainFrame, frameProcessId, frameRoutingId){
  // authWindow.webContents.on('dom-ready', function(e){
    if(url.indexOf("classrooms")!=-1){
      console.log("navigated!")
    // console.log(url)
    
      session.defaultSession.cookies.get({}, (error, cookies) => {
        console.log("default session")
        console.log(error, cookies)
      })
      session.defaultSession.flushStorageData()
      var req = net.request({url: desktop_url, session: session.defaultSession})
      req.on('response', function(resp){
        console.log("got response")
        resp.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`)
        })
      })
      req.end()
    }
    
    // if(url.indexOf('classrooms') !== -1){
    //   

    //   sess.cookies.get({}, (error, cookies) => {
    //     console.log("sess")
    //     console.log(error, cookies)
    //   })
      
    // }
  })
}

function loadAssignments(desktop_url){
  // sess = session.fromPartition("persist:classroom")
  session.defaultSession.clearStorageData()
  openAuthWindow(desktop_url)
}

app.on('open-url', function(event, urlToOpen) {
  event.preventDefault();

  if(!mainWindow){
    createWindow()
  }
  console.log(urlToOpen)
  var parsed = new URL(urlToOpen);
  var assignment_path = parsed.searchParams.get("assignment")
  var root_url = parsed.searchParams.get("host")
  
  loadAssignments(root_url + assignment_path + "/desktop")

  
  // global.sharedObj = {usernames: usernames, urls: urls, title: title, token:token, type:type}
  // console.log(global.sharedObj)
  // mainWindow.webContents.send('open-url')
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
})