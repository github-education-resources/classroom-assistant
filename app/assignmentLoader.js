const electron = require("electron")
const {BrowserWindow, session} = electron
const { URL } = require("url")

let mainWindow, authWindow

global.sharedObj = {
  accessToken: null,
}

module.exports = {
  authorizeUser (mainWindowRef, assignmentURL) {
    mainWindow = mainWindowRef
    openAuthWindow(parseLoginURL(assignmentURL))
    const loginFilter = { // Assumes we redirect to /classrooms route on login, might need a better solution later
      urls: ["*://*./classrooms"]
    }
    session.defaultSession.webRequest.onResponseStarted(loginFilter, closeWindow)
  }
}

function closeWindow () {
  authWindow.close()
  authWindow = null
  mainWindow.webContents.send("receivedAuthorization")
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

function parseLoginURL (assignmentURL) {
  var urlObj = new URL(assignmentURL)
  console.log(`${urlObj.origin}/login`)
  return `${urlObj.origin}/login`
}
