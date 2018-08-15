import fetch from "electron-fetch/lib"
import keytar from "keytar"
import {BrowserWindow, session} from "electron"

const { URL } = require("url")

let authWindow

export function authorizeUser (mainWindowRef, protocolHandler) {
  openAuthWindow(mainWindowRef, protocolHandler)
}

export async function setAccessToken (code, mainWindow) {
  if (authWindow) {
    authWindow.destroy()
  }
  // TODO: Error handling
  const data = await fetchAccessToken(code)
  await keytar.setPassword("Classroom-Desktop", "x-access-token", data.access_token)
  mainWindow.webContents.send("receivedAuthorization")
}

function openAuthWindow (mainWindow, protocolHandler) {
  authWindow = new BrowserWindow({
    height: 650,
    width: 400,
    frame: false,
    show: false,
    parent: mainWindow,
    webPreferences: {
      session: session.fromPartition("auth:session"),
      nodeIntegration: false,
    },
  })

  const authURL = new URL("http://localhost:5000/login/oauth/authorize")

  authWindow.webContents.loadURL(authURL.toString())

  authWindow.once("ready-to-show", () => {
    if (authWindow) {
      authWindow.show()
    }
  })
}

function fetchAccessToken (code) {
  return fetch(`http://localhost:5000/login/oauth/access_token?code=${code}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Accept": "application/json",
    },
  }).then(response => response.json())
}
