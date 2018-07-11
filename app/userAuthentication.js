import fetch from "electron-fetch/lib"
import appInfo from "./app-info.json"
import keytar from "keytar"
import {BrowserWindow, session} from "electron"

let mainWindow, authWindow

const clientId = appInfo["client_id"]
const clientSecret = appInfo["client_secret"]
const requiredScopes = ["repo"].join("%20")

export function authorizeUser (mainWindowRef) {
  mainWindow = mainWindowRef
  openAuthWindow()
}

export function fetchAccessToken (code) {
  authWindow.destroy()
  var data = {
    client_id: clientId,
    client_secret: clientSecret,
    code: code,
  }
  fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Accept": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      // dispatchUsernameToRenderer(data.access_token)
      keytar.setPassword("Classroom-Desktop", "token", data.access_token)
      mainWindow.webContents.send("receivedAuthorization")
    })
    .catch((error) => console.log(error))
}

// function dispatchUsernameToRenderer (token) {
//   const apiBaseURL = "https://api.github.com"
//   const query = "/user"
//   fetch(`${apiBaseURL}${query}`).then()
// }

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
  console.log(`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${requiredScopes}`)
  authWindow.loadURL(`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${requiredScopes}`)

  authWindow.once("ready-to-show", () => {
    if (authWindow) {
      authWindow.show()
    }
  })
}
