const ipcRenderer = require("electron").ipcRenderer

// Public: a module for logging in renderer processes. Sends all messages to the
// main logger (../logger.js)
//
// Examples
//
//    logger.info("Hello world from the browser window!")
//    logger.error("UI component failed to render")
module.exports = {
  info (message) {
    ipcRenderer.send("log-entry", {
      type: "info",
      message: message
    })
  },

  warning (message) {
    ipcRenderer.send("log-entry", {
      type: "warning",
      message: message
    })
  },

  error (message) {
    ipcRenderer.send("log-entry", {
      type: "error",
      message: message
    })
  },

  debug (message) {
    ipcRenderer.send("log-entry", {
      type: "debug",
      message: message
    })
  }
}
