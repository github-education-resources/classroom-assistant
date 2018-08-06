import fetch from "electron-fetch/lib"
import keytar from "keytar"
import {BrowserWindow, session} from "electron"

const { URL } = require("url")

let authWindow

export function authorizeUser (mainWindowRef, protocolHandler) {
  openAuthWindow(protocolHandler)
}

export async function fetchAccessToken (code, mainWindow) {
  return new Promise((resolve, reject) => {
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
        await keytar.setPassword("Classroom-Desktop", "token", data.access_token)
        mainWindow.webContents.send("receivedAuthorization")
        resolve()
      })
      // TODO: Send IPC Message to close window and show error message
      .catch((error) => reject(error))
  })
}

function openAuthWindow (protocolHandler) {
  authWindow = new BrowserWindow({
    height: 650,
    width: 400,
    frame: false,
    show: false,
    webPreferences: {
      session: session.defaultSession,
      nodeIntegration: false,
    },
  })

  const authURL = new URL("http://localhost:5000/login/oauth/authorize")
  authURL.searchParams.set("redirect_uri", `${protocolHandler}://`)

  console.log(authURL.toString())
  authWindow.webContents.loadURL(authURL.toString())

  authWindow.once("ready-to-show", () => {
    if (authWindow) {
      authWindow.show()
    }
  })
}
