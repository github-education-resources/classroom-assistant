const os = require("os")
const electron = require("electron")
const { autoUpdater, dialog } = electron
const log = require("electron-log")

// Internal: URL of the update metadata server -
//    an instance of Aluxian/squirrel-updates-server
const UPDATES_SERVER_URL = "https://classroom.github.com/assistant"

const updater = {

  // Public: start listening for autoupdates from Squirrel update server.
  //
  // app                - electron app object being updated.
  // interval           - number denoting millis between checks for updates.
  // availableCallback  - callback function fired when an update is found.
  // errorCallback      - callback function called if an error occurs. Takes
  //                      the error oject as an argument.
  //
  // Returns noting.
  start(app, interval) {
    log.info("starting auto-updater")
    const platform = os.platform() + "_" + os.arch()

    try {
      autoUpdater.setFeedURL(`${UPDATES_SERVER_URL}/update/${platform}/${app.getVersion()}`)

      // Fire callbacks on events for notification purposes
      autoUpdater.on("error", (err) => {
        log.error(err)
      })

      autoUpdater.on("update-downloaded", (releaseNotes, releaseName) => {
        log.info("Application update downloaded")

        const updateDialogOpts = {
          type: "info",
          buttons: ["Restart", "Later"],
          title: "Application Update",
          message: "An update for this Classroom Assistant has been downloaded. Please restart the application to apply the updates."
        }

        dialog.showMessageBox(updateDialogOpts, (response) => {
          if (response === 0) autoUpdater.quitAndInstall()
        })
      })

      log.info("checking for updates..")
      autoUpdater.checkForUpdates()
      setInterval(() => {
        log.info("checking for updates..")
        autoUpdater.checkForUpdates()
      }, interval)
    } catch (err) {
      log.warn(`Failed to initialize updater ${err}`)
    }
  }
}

module.exports = updater
