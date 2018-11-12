import isDev from "electron-is-dev"
const {app, dialog} = require("electron")

export const moveToApplicationsFolder = () => {
    if (!app.isInApplicationsFolder()) {
      const button = dialog.showMessageBox({
        type: "question",
        buttons: ["Move to Applications", "Do Not Move"],
        message: "Move to Applications Folder?",
        detail: "I can move myself to the Applications folder if you'd like. Please note that the auto-updater will not work on a read-only volume.",
        defaultId: 1
      })

      if (button == 0) {
        app.moveToApplicationsFolder()
      }
    }
}
