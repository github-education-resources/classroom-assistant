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

function getCookieString(callback){
  var cookieString = ""
  sess.cookies.get({}, (error, cookies) => {
    cookies.forEach(cookie => {
      cookieString += ` ${cookie.name}=${cookie.value};`
    })
    console.log(`Cookie String: ${cookieString}`)
    callback(cookieString)
  })
}

function openAuthWindow(login_url, desktop_url){
  console.log("Open Auth window")
  authWindow = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      nativeWindowOpen: true,
      session: sess
    }
  })
  authWindow.loadURL(login_url) //Load login path to classroom
}

function loadAssignmentRepos(login_url, assignment_url, callback){
  console.log("getting assignments " + assignment_url)
  sess = session.defaultSession
  openAuthWindow(login_url, assignment_url)  
  
  const loginFilter = { //Assumes we redirect to /classrooms route on login, might need a better solution later
    urls: ['*://*./classrooms']
  } 
  sess.webRequest.onResponseStarted(loginFilter, (details) => {
    authWindow.close()
  
    getCookieString((cookieString)=> {
      var req = net.request({url: assignment_url, redirect: "manual"})
      
      req.on('response', (resp) => {
        var raw_params = ""
        resp.on('data', (chunk) => {
          raw_params += chunk  
        })
        resp.on('end', () => {
          callback(JSON.parse(raw_params))
        })
      })

      req.on("redirect", (statusCode, method, redirectUrl, responseHeaders) => {
        req.setHeader("Cookie", cookieString)
        req.followRedirect()
      })

      req.end()
    })
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
  
  loadAssignmentRepos(root_url+"/login", root_url + assignment_path + "/desktop", (params) => {
    console.log("Final Params!")
    console.log(params)
    global.sharedObj = {repos: params.repos, title: params.title, type: "individual"}
    mainWindow.webContents.send('open-url')
  })
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