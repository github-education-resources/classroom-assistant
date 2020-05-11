/* eslint-env node */
const { app, Menu } = require("electron")
const isDev = require("electron-is-dev")

const defaultTemplate = [
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      { role: "delete" },
      { role: "selectall" }
    ]
  },
  {
    role: "window",
    submenu: [
      { role: "minimize" },
      { role: "close" }
    ]
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click() { require("electron").shell.openExternal("https://github.com/education/classroom-assistant") }
      }
    ]
  }
]

const addDarwinOptions = () => {
  defaultTemplate.unshift({
    label: app.getName(),
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "services", submenu: [] },
      { type: "separator" },
      { role: "hide" },
      { role: "hideothers" },
      { role: "unhide" },
      { type: "separator" },
      { role: "quit" }
    ]
  })

  // Window menu
  defaultTemplate[3].submenu = [
    { role: "close" },
    { role: "minimize" },
    { role: "zoom" },
    { type: "separator" },
    { role: "front" }
  ]
}

const addDevOptions = () => {
  defaultTemplate.unshift({
    label: "View",
    submenu: [
      {
        label: "Reload",
        accelerator: "CmdOrCtrl+R",
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload()
        }
      },
      {
        label: "Toggle Developer Tools",
        accelerator: process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools()
        }
      }
    ]
  })
}

export const generateMenu = () => {
  if (isDev) {
    addDevOptions()
  }
  if (process.platform === "darwin") {
    addDarwinOptions()
  }

  const menu = Menu.buildFromTemplate(defaultTemplate)
  Menu.setApplicationMenu(menu)
}
