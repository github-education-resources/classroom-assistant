// Disabling no-console for now, as there is currently no UI
/* eslint no-console: "off" */

const ipcRenderer = require("electron").ipcRenderer

ipcRenderer.on("info", (event, data) => {
  console.log(data.msg)
})
