const fs = require("fs-extra")

const appInfo = JSON.stringify({
  ga_id: process.env.GOOGLE_ANALYTICS_ID,
})

// eslint-disable-next-line space-before-function-paren
function getWindowsCertificatePassword() {
  if (process.env.KEY_PASSWORD) {
    return process.env.KEY_PASSWORD
  } else {
    console.log("Skipping Windows Certificate Password")
  }
}

module.exports = {
  packagerConfig: {
    packageManager: "npm",
    osxSign: true,
    executableName: "classroom-assistant",
    icon: "./app/resources/icon.icns",
    protocols: [
      {
        name: "Classroom Assistant",
        schemes: ["x-github-classroom"],
      },
    ],
  },
  makers: [
    {
      name: "@electron-forge/maker-zip",
    },
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "classroom-assistant",
        title: "classroom-assistant",
        exe: "classroom-assistant.exe",
        iconUrl: "./app/resources/icon.ico",
        setupIcon: "./app/resources/icon.ico",
        loadingGif: "./app/resources/images/win32-installer-splash.gif",
        certificateFile: "./script/windows-certificate.pfx",
        certificatePassword: getWindowsCertificatePassword(),
      },
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          icon: "./app/resources/images/classroom-logo.png",
          categories: ["Education"],
          homepage: "https://classroom.github.com/assistant",
        },
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {
        options: {
          icon: "./app/resources/images/classroom-logo.png",
          categories: ["Education"],
          homepage: "https://classroom.github.com/assistant",
        },
      },
    },
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "education",
          name: "classroom-assistant"
        },
        prerelease: true
      }
    }
  ],
  windowsStoreConfig: {
    packageName: "",
    name: "classroom-assistant"
  },
  hooks: {
    generateAssets: async () => {
      return new Promise((resolve, reject) =>
        fs.writeFile("./app/app-info.json", appInfo, (e) => {
          if (e) reject(e)
          else resolve()
        })
      )
    },
  },
  plugins: [
    [
      "@electron-forge/plugin-webpack",
      {
        mainConfig: "./webpack.main.config.js",
        renderer: {
          config: "./webpack.renderer.config.js",
          entryPoints: [
            {
              html: "./app/index.html",
              js: "./app/index.jsx",
              name: "main_window",
            },
          ],
        },
      },
    ],
  ],
}
