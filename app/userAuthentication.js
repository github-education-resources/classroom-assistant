import {BrowserWindow, session} from "electron"

let mainWindow, authWindow

export function authorizeUser (mainWindowRef) {
  mainWindow = mainWindowRef
  openAuthWindow()

  const loginFilter = { // Assumes we redirect to /classrooms route on login, might need a better solution later
    urls: ["*://*./classrooms"]
  }
  session.defaultSession.webRequest.onResponseStarted(loginFilter, receivedAuthorization)
}

function receivedAuthorization () {
  authWindow.destroy()
  mainWindow.webContents.send("receivedAuthorization")
  // TODO: Save session in keytar and clear session on close?
}

function openAuthWindow () {
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

  authWindow.loadURL("http://localhost:5000/login") // FOR TESTING SWITCH TO CLASSROOM URL IN PROD
  authWindow.once("ready-to-show", () => {
    if (authWindow) {
      authWindow.show()
    }
  })
}
