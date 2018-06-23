const electron = require("electron")
const {BrowserWindow, net, session} = electron
const { URL } = require("url")

const logger = require("./logger")

let mainWindow, authWindow, loginURL, desktopURL

module.exports = {
  loadAssignmentRepos (mainWindowRef, assignmentURLString) {
    mainWindow = mainWindowRef
    parseURL(assignmentURLString)
    logger.info(`Loading assignment repos from ${desktopURL}`)
    openAuthWindow(loginURL, desktopURL)

    const loginFilter = { // Assumes we redirect to /classrooms route on login, might need a better solution later
      urls: ["*://*./classrooms"]
    }
    session.defaultSession.webRequest.onResponseStarted(loginFilter, fetchRepos)
  }
}

function fetchRepos (details) {
  authWindow.close()
  var req = net.request({url: desktopURL})
  getCookieString((cookieString) => {
    req.setHeader("Cookie", cookieString) // manually send cookies
    req.on("response", (resp) => {
      var rawParams = ""
      resp.on("data", (chunk) => {
        rawParams += chunk // Combine all chunks to parse JSON
      })
      resp.on("end", () => {
        sendParamsToRenderer(rawParams)
      })
    })
    req.end()
  })
}

function getCookieString (callback) {
  var cookieString = ""
  session.defaultSession.cookies.get({}, (error, cookies) => {
    if (error) console.error(error)
    cookies.forEach(cookie => {
      cookieString += ` ${cookie.name}=${cookie.value};`
    })
    callback(cookieString)
  })
}

function openAuthWindow (loginURL, desktopURL) {
  console.log("Open Auth window")
  authWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    height: 200,
    webPreferences: {
      session: session.defaultSession,
    }
  })
  authWindow.loadURL(loginURL) // Load login path to classroom
}

function sendParamsToRenderer (rawParams) {
  var params = JSON.parse(rawParams)
  global.sharedObj = {repos: params.repos, title: params.title, type: params.type}
  mainWindow.webContents.send("open-url")
}

function parseURL (url) {
  var urlObj = new URL(url)
  loginURL = `${urlObj.origin}/login`
  desktopURL = `${url}/desktop`
}
