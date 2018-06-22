/* eslint-env node */

const electron = require("electron")
const {app, BrowserWindow, ipcMain, net, session} = electron
const isDev = require("electron-is-dev")
const { URL } = require('url')
const axios = require('axios')

const updater = require("./updater")
const logger = require("./logger")
const https = require('https')

let mainWindow, authWindow, sess, lastRedirectURL

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

function openAuthWindow(login_url, desktop_url){
  console.log("open Auth window")
  authWindow = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      nativeWindowOpen: true,
      session: sess
    }
  })

  authWindow.loadURL(login_url) //Load login path to classroom

  authWindow.webContents.on('did-navigate-in-page', function(e, url, isMainFrame, frameProcessId, frameRoutingId){
    console.log("navigated!")
    console.log(url)
    if(url.indexOf("/classrooms" !== -1) ){ //Authentication is finished
      console.log("Logged in!")
      sess.flushStorageData() //flush session to disk

      var req = net.request({url: desktop_url, session: sess, redirect: "manual"}) //use session to make request

      req.on('response', function(resp){
        console.log("!!!!!!!!!Got response!!!!!!!!")
        console.log(resp.headers)
        console.log("---------Session Cookies----------")
         // Query all cookies associated with a specific url.
        sess.cookies.get({}, (error, cookies) => {
          console.log(error, cookies)
        })

        // resp.on('data', (chunk) => {
        //   console.log(`BODY: ${chunk}`)
        // })
        // console.log(JSON.parse(data))
      })

      req.on('redirect', function(statusCode, method, url, headers){
        console.log("!!!!!!!!!Got redirect!!!!!!!!")
        console.log("-----URL--------")
        console.log(url)
        console.log("-------Headers:-------")
        console.log(headers)
        console.log("---------Session Cookies----------")
         // Query all cookies associated with a specific url.
        sess.cookies.get({}, (error, cookies) => {
          console.log(error, cookies)
        })
        req.followRedirect()
      })
      req.end()
    }
  })
}


function loadAssignments(login_url,assignment_url){
  console.log("getting assignments " + assignment_url)
  sess = session.fromPartition("classroom")
  sess.clearStorageData()
  openAuthWindow(login_url, assignment_url)
  const filter = {
      urls: ["http://github.com/*","https://github.com/*", "http://www.github.com/*", "https://www.github.com/*"]
  }
  sess.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    console.log("++++++++sending headers!++++++++++")
    console.log(details.requestHeaders)
    
    callback({ cancel: false, requestHeaders: details.requestHeaders })
  })

  
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
  
  loadAssignments(root_url+"/login", root_url + assignment_path + "/desktop")

  
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