const autoUpdater = require("electron").autoUpdater
const logger = require("./logger")

// Internal: URL of the update metadata server -
//    an instance of Aluxian/squirrel-updates-server
const UPDATES_SERVER_URL = "http://cd-us.herokuapp.com"

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
    autoUpdater.setFeedURL(`${UPDATES_SERVER_URL}/update/darwin?version=${app.getVersion()}`)

    // Fire callbacks on events for notification purposes
    autoUpdater.on("error", errorCallback)
    autoUpdater.on("update-available", availableCallback)

    autoUpdater.on("update-downloaded", () => {
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
