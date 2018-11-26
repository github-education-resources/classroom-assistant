import isDev from "electron-is-dev"
const {app, dialog} = require("electron")
const log = require("electron-log")

export const moveToApplicationsFolder = () => {
  if (!app.isInApplicationsFolder() && !isDev) {
    const button = dialog.showMessageBox({
      type: "question",
      buttons: ["Move to Applications", "Do Not Move"],
      message: "Move to Applications Folder?",
      detail: "I can move myself to the Applications folder if you'd like. Please note that the auto-updater will not work if the app is in a read-only volume.",
      defaultId: 0
    })

    if (button === 0) {
      try {
        app.moveToApplicationsFolder()
      } catch (e) {
        log.warn(`Failed to move application to Applications Folder: ${e}`)
      }
    }
  }
}
