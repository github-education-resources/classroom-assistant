const electron = require("electron")
const {BrowserWindow, session} = electron
const { URL } = require("url")

let mainWindow, authWindow, assignmentURL

global.sharedObj = {
  accessToken: null,
  assignmentURL: null,
}

module.exports = {
  loadAssignmentRepos (mainWindowRef, assignmentURLRef) {
    mainWindow = mainWindowRef
    assignmentURL = assignmentURLRef

    var loginURL = parseLoginURL()
    openAuthWindow(loginURL)
    const loginFilter = { // Assumes we redirect to /classrooms route on login, might need a better solution later
      urls: ["*://*./classrooms"]
    }
    session.defaultSession.webRequest.onResponseStarted(loginFilter, sendRendererMessage)
  }
}

function sendRendererMessage () {
  authWindow.close()
  mainWindow.webContents.send("open-url", assignmentURL)
}

function openAuthWindow (loginURL) {
  authWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    height: 600,
    width: 400,
    show: false,
    webPreferences: {
      session: session.defaultSession,
    }
  })
  authWindow.loadURL(loginURL) // Load login path to classroom

  authWindow.once("ready-to-show", () => {
    authWindow.show()
  })
}

function parseLoginURL () {
  var urlObj = new URL(assignmentURL)
  return `${urlObj.origin}/login`
}
