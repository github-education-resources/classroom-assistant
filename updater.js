const autoUpdater = require('electron').autoUpdater

UPDATES_SERVER_URL = "http://cd-us.herokuapp.com"

module.exports = {
  /**
   * Start listening for autoupdates from Squirrel update server.
   *
   * @param {Object}    app               electron app being updated
   * @param {Number}    interval          ms between update checks
   * @param {Function}  availableCallback callback fired when update is found
   * @param {Function}  errorCallback     callback fired on updater error
   */
  start(app, interval, availableCallback, errorCallback) {
    autoUpdater.setFeedURL(`${UPDATES_SERVER_URL}/update/darwin?version=${app.getVersion()}`)

    // Fire callbacks on events for notification purposes
    autoUpdater.on('error', errorCallback);
    autoUpdater.on('update-available', availableCallback);

    autoUpdater.on('update-downloaded', () => {
      autoUpdater.quitAndInstall()
    })

    autoUpdater.checkForUpdates()
    setInterval(function() {
      autoUpdater.checkForUpdates()
    }, interval)
  }
}
