const electron = require("electron")
const {BrowserWindow, net, session} = electron
const { URL } = require("url")

const logger = require("./logger")

let mainWindow, authWindow, assignmentURL

global.sharedObj = {}

module.exports = {
  loadAssignmentRepos (mainWindowRef, assignmentURLString) {
    mainWindow = mainWindowRef
    assignmentURL = assignmentURLString
    var loginURL = parseLoginURL()
    openAuthWindow(loginURL)
    const loginFilter = { // Assumes we redirect to /classrooms route on login, might need a better solution later
      urls: ["*://*./classrooms"]
    }
    session.defaultSession.webRequest.onResponseStarted(loginFilter, fetchRepos)
  }
}

function fetchRepos (details) {
  authWindow.close()
  console.log(assignmentURL)
  mainWindow.webContents.send("open-url", assignmentURL)
}

function openAuthWindow (loginURL) {
  console.log("Open Auth window")
  authWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    height: 600,
    width: 400,
    webPreferences: {
      session: session.defaultSession,
    }
  })
  authWindow.loadURL(loginURL) // Load login path to classroom
}

function parseLoginURL () {
  var urlObj = new URL(assignmentURL)
  return `${urlObj.origin}/login`
  // infoURL = `${urlObj.origin}/api/internal/${urlObj.pathname}/info`
  // repoURL = `${urlObj.origin}/api/internal/${urlObj.pathname}/repos`
}
