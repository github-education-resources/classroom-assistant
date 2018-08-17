function getOSXSigningIdentity () {
  if (process.platform !== "darwin") {
    return
  }

  if (process.env.CLASSROOM_DESKTOP_OSX_DEVELOPER_ID) {
    return process.env.CLASSROOM_DESKTOP_OSX_DEVELOPER_ID
  } else {
    console.log("CLASSROOM_DESKTOP_OSX_DEVELOPER_ID not set, the app will not be signed")
  }
}

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
    osxSign: {
      identity: getOSXSigningIdentity()
    },
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
    name: "classroom-desktop",
    iconUrl: "./app/resources/icon.ico",
  },
  electronInstallerDebian: {},
  electronInstallerRedhat: {},
  github_repository: {
    owner: "education",
    name: "classroom-desktop"
  },
  prerelease: true,
  windowsStoreConfig: {
    packageName: "",
    name: "classroom-desktop"
  },
}
