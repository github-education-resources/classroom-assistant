const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const isDev = require('electron-is-dev')

const updater = require('./updater')

// Configure app window
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL(`file://${__dirname}/app/index.html`)
  mainWindow.webContents.openDevTools()

  // Start updater unless in development mode
  if (!isDev) {
    var msBetweenUpdates = 1000 * 60 * 30
    updater.start(app, msBetweenUpdates, () => {
      mainWindow.webContents.send('info', {msg: "update found"})
    }, (err) => {
      mainWindow.webContents.send('info', {msg: err})
    })
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
