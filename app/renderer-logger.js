const ipcRenderer = require("electron").ipcRenderer

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
