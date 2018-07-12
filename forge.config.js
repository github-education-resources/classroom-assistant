const fs = require("fs")

const devClientId = "e56ae4a7249b39454ea5"
const devClientSecret = "c00b3a34ca123c1e0870007aec67e91d5618bc46"

const s = JSON.stringify

const appInfo = s({
  client_id: process.env.CLASSROOM_DESKTOP_OAUTH_CLIENT_ID || devClientId,
  client_secret: process.env.CLASSROOM_DESKTOP_OAUTH_CLIENT_SECRET || devClientSecret,
})

module.exports = {
  // other config here
  make_targets: {
    win32: [
      "squirrel"
    ],
    darwin: [
      "zip"
    ],
    linux: [
      "deb",
      "rpm"
    ]
  },
  electronPackagerConfig: {
    packageManager: "npm",
    icon: "./app/resources/icon.icns",
    protocols: [
      {
        name: "Classroom Desktop",
        schemes: [
          "x-github-classroom"
        ]
      }
    ]
  },
  electronWinstallerConfig: {
    name: "classroom-desktop"
  },
  electronInstallerDebian: {},
  electronInstallerRedhat: {},
  github_repository: {
    owner: "",
    name: ""
  },
  windowsStoreConfig: {
    packageName: "",
    name: "classroom-desktop"
  },
  hooks: {
    generateAssets: async () => {
      return new Promise((resolve, reject) =>
        fs.writeFile("./app/app-info.json", appInfo, (e) => {
          if (e) reject(e)
          else resolve()
        })
      )
    }
  }
}
