import os from "os"

const autoUpdater = require("electron").autoUpdater
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
  start (app, interval, availableCallback, errorCallback) {
    logger.info("starting auto-updater")
    const platform = os.platform() + "_" + os.arch()
    autoUpdater.setFeedURL(`${UPDATES_SERVER_URL}/update/${platform}/${app.getVersion()}`)

    // Fire callbacks on events for notification purposes
    autoUpdater.on("error", errorCallback)
    autoUpdater.on("update-available", availableCallback)

    autoUpdater.on("update-downloaded", () => {
      // TODO: Prompt User to Restart Application
      logger.info("downloaded update, installing")
      autoUpdater.quitAndInstall()
    })

    logger.info("checking for updates..")
    autoUpdater.checkForUpdates()
    setInterval(() => {
      logger.info("checking for updates..")
      autoUpdater.checkForUpdates()
    }, interval)
  }
}
