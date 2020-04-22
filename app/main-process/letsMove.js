import isDev from "electron-is-dev"

const { app, dialog } = require("electron")
const log = require("electron-log")
const Store = require("electron-store")

export const moveToApplicationsFolder = () => {
  // Check that we're on Mac OS
  if (typeof (app.isInApplicationsFolder) === typeof (Function)) {
    if (!app.isInApplicationsFolder() && !isDev && !userOptedOut()) {
      dialog.showMessageBox({
        type: "question",
        buttons: ["Move to Applications", "Do Not Move"],
        message: "Move to Applications Folder?",
        detail: "I can move myself to the Applications folder if you'd like. This will ensure that future updates will be installed correctly.",
        checkboxLabel: "Do not ask me again",
        defaultId: 0
      }, (response, checkboxChecked) => {
        if (response === 0) {
          try {
            if (!app.moveToApplicationsFolder()) {
              throw new Error("Failed to move to Applications Folder.")
            }
          } catch (e) {
            log.warn(`Failed to move application to Applications Folder: ${e}`)
          }
        }

        if (checkboxChecked) {
          // Don't remind user again
          optOutReminder()
        }
      })
    }
  }
}

const userOptedOut = () => {
  const store = new Store()
  return store.get("classroom-assistant-opt-out-move")
}

const optOutReminder = () => {
  const store = new Store()
  store.set("classroom-assistant-opt-out-move", true)
}
