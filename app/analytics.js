import appInfo from "./app-info.json"

const ua = require("universal-analytics")
const uuid = require("uuid/v4")
const Store = require("electron-store")
const log = require("electron-log")
const packageInfo = require("../package")

const gaID = appInfo["ga_id"]

const fetchGAUser = () => {
  const store = new Store()

  const userId = store.get("classroom-assistant-ga-user-id") || uuid()

  store.set("classroom-assistant-ga-user-id", userId)

  log.info(gaID)
  return ua(gaID, userId)
}

export const trackEvent = (category, action, label = null, value = null) => {
  const usr = fetchGAUser()
  usr.event({
    ec: category,
    ea: action,
    el: label,
    ev: value,
  }).send()
}

export const trackException = (description, fatal = false) => {
  const usr = fetchGAUser()
  usr.exception(description, fatal).send()
  log.info(`GA Exception: ${description}`)
}

export const trackScreen = (screenName) => {
  const usr = fetchGAUser()
  usr.screenview(screenName, packageInfo.name, packageInfo.version).send()
  log.info(`GA Track Screen: ${screenName}`)
}

// Share with Renderer Process
global.trackEvent = trackEvent
global.trackException = trackException
global.trackScreen = trackScreen
