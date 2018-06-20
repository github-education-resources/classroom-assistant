/* eslint-env node */

const electron = require("electron")
const {app, BrowserWindow, ipcMain, net} = electron
const isDev = require("electron-is-dev")
const { URL } = require('url')

const updater = require("./updater")
const logger = require("./logger")
const https = require('https')


let mainWindow, authWindow, lastRedirectURL

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
  if (lastRedirectURL){
    authWindow = new BrowserWindow({
      width: 400,
      height: 600,
      webPreferences: {
        nativeWindowOpen: true
      }
    })
    authWindow.loadURL(lastRedirectURL)

    authWindow.webContents.on('did-navigate-in-page', function(e, url, isMainFrame, frameProcessId, frameRoutingId){
      // httpsFollowRedirect(desktop_url)
      console.log("navigated!")
      console.log(url)
      if(url.indexOf("/classrooms") != -1){
        console.log("in classrooms")

        
        // console.log(authWindow.webContents)
        // authWindow.loadURL(desktop_url)
        // var sess = authWindow.webContents.session
        // console.log("session:")
        // sess.cookies.get({}, function(error, cookies) {
        //   console.log(cookies);
        // });
        // const req = net.request({url: desktop_url, session: sess, redirect: "manual"})

        // req.on('redirect', function(statusCode, method, redirectURL, responseHeaders){
        //   console.log("redirect")
        //   console.log(redirectURL)
        //   req.followRedirect()
        // })

        // req.on("response", function(response){
        //   response.on("data", function(chunk){
        //     console.log(`BODY: ${chunk}`)
        //   })
        //   response.on("end", function(){
        //     console.log("fin")
        //   })
        // })
        // req.end()
      }
    })
  }
}

function httpsFollowRedirect(url){
  const req = net.request({url: url, redirect: "manual"})
  req.on('redirect', function(statusCode, method, redirectURL, responseHeaders){
      console.log("redirect!")
      console.log(redirectURL)
      lastRedirectURL = redirectURL
      req.followRedirect()
  })
  req.on('response', function(response){
    console.log("response!")
    var contentType = response.headers['content-type']
    if(contentType.indexOf("application/json") == -1){
      openAuthWindow(url)
    }else{
      console.log("got json!!")
      // console.log(response)
    }
  })
  req.end()
}

function getAssignments(login_url, assignment_url){
  console.log("getting assignments " + assignment_url)
  httpsFollowRedirect(assignment_url)
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
  var assignment_path = parsed.searchParams.get("assignment")
  var root_url = parsed.searchParams.get("host")
  
  getAssignments(root_url + "/login", root_url + assignment_path + "/desktop")
  // console.log('populate') // prints "ping"
  // authWindow = new BrowserWindow({
  //   width: 400,
  //   height: 600,
  //   webPreferences: {
  //     nativeWindowOpen: true
  //   }
  // })
  
  
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