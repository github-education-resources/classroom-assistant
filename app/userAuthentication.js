import fetch from "electron-fetch/lib"
import keytar from "keytar"
import {BrowserWindow, session} from "electron"

const { URL } = require("url")

let mainWindow, authWindow

export function authorizeUser (mainWindowRef, protocolHandler) {
  mainWindow = mainWindowRef
  openAuthWindow(protocolHandler)
}

export async function fetchAccessToken (code) {
  if (authWindow) {
    authWindow.destroy()
  }

  fetch(`http://localhost:5000/login/oauth/access_token?code=${code}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Accept": "application/json",
    },
  })
    .then(response => response.json())
    .then(async data => {
      console.log(data)
      await keytar.setPassword("Classroom-Desktop", "token", data.access_token)
      mainWindow.webContents.send("receivedAuthorization")
    })
    // TODO: Send IPC Message to close window and show error message
    .catch((error) => console.log(error))
}

function openAuthWindow (protocolHandler) {
  authWindow = new BrowserWindow({
    height: 650,
    width: 400,
    titleBarStyle: "hidden",
    show: false,
    webPreferences: {
      session: session.defaultSession,
      nodeIntegration: false,
    },
  })

  const authURL = new URL("http://localhost:5000/login/oauth/authorize")
  authURL.searchParams.set("redirect_uri", `${protocolHandler}://`)
  authWindow.loadURL(authURL.toString())

  authWindow.once("ready-to-show", () => {
    if (authWindow) {
      authWindow.show()
    }
  })
}
