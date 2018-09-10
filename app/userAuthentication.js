import axios from "axios"
import keytar from "keytar"
import {BrowserWindow, session} from "electron"

const { URL } = require("url")
const logger = require("./logger")

let authWindow

export function authorizeUser (mainWindowRef, protocolHandler) {
  openAuthWindow(mainWindowRef, protocolHandler)
}

export async function setAccessToken (code, mainWindow) {
  if (authWindow) {
    authWindow.destroy()
  }
  // TODO: Error handling
  try {
    const token = await fetchAccessToken(code)
    await keytar.setPassword("Classroom-Desktop", "x-access-token", token)
    mainWindow.webContents.send("receivedAuthorization")
  } catch (error) {
    logger.error(error)
  }
}

function openAuthWindow (mainWindow, protocolHandler) {
  authWindow = new BrowserWindow({
    height: 650,
    width: 400,
    show: false,
    parent: mainWindow,
    webPreferences: {
      session: session.fromPartition("auth:session"),
      nodeIntegration: false,
    },
  })

  const authURL = new URL("http://classroom.github.com/login/oauth/authorize")

  authWindow.webContents.loadURL(authURL.toString())

  authWindow.once("ready-to-show", () => {
    if (authWindow) {
      authWindow.show()
    }
  })
}

async function fetchAccessToken (code) {
  const accessTokenURL = `http://classroom.github.com/login/oauth/access_token?code=${code}`
  const response = await axios.post(accessTokenURL, {
    "Content-Type": "application/json; charset=utf-8",
    "Accept": "application/json",
  })
  return response.data.access_token
}
