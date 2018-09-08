import os from "os"

const electron = require("electron")
const {autoUpdater, dialog} = electron
const logger = require("./logger")

// Internal: URL of the update metadata server -
//    an instance of Aluxian/squirrel-updates-server
const UPDATES_SERVER_URL = "http://localhost:5000/desktop"

module.exports = {

  // Public: start listening for autoupdates from Squirrel update server.
  //
  // app                - electron app object being updated.
  // interval           - number denoting millis between checks for updates.
  // availableCallback  - callback function fired when an update is found.
  // errorCallback      - callback function called if an error occurs. Takes
  //                      the error oject as an argument.
  //
  // Returns noting.
  start (app, interval) {
    logger.info("starting auto-updater")
    const platform = os.platform() + "_" + os.arch()
    autoUpdater.setFeedURL(`${UPDATES_SERVER_URL}/update/${platform}/${app.getVersion()}`)

    // Fire callbacks on events for notification purposes
    autoUpdater.on("error", (err) => {
      logger.error(err)
    })

    autoUpdater.on("update-downloaded", (releaseNotes, releaseName) => {
      logger.info("Application update downloaded")

      const updateDialogOpts = {
        type: "info",
        buttons: ["Restart", "Later"],
        title: "Application Update",
        message: "An update for this Classroom Assistant has been downloaded. Please restart the application to apply the updates.",
        detail: process.platform === "win32" ? releaseName : releaseNotes
      }

      dialog.showMessageBox(updateDialogOpts, (response) => {
        if (response === 0) autoUpdater.quitAndInstall()
      })
    })

    logger.info("checking for updates..")
    autoUpdater.checkForUpdates()
    setInterval(() => {
      logger.info("checking for updates..")
      autoUpdater.checkForUpdates()
    }, interval)
  }
}
