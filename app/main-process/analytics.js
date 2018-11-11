const ua = require("universal-analytics")
const uuid = require("uuid/v4")
const Store = require("electron-store")
const log = require("electron-log")
const packageInfo = require("../../package")

const fetchGAUser = () => {
  let gaID
  try {
    const appInfo = require("./app-info.json")
    gaID = appInfo["ga_id"]
  } catch (e) {
    log.warn("Google Analytics ID not found, not tracking any events.")
    return null
  }

  const store = new Store()
  const userId = store.get("classroom-assistant-ga-user-id") || uuid()
  store.set("classroom-assistant-ga-user-id", userId)

  return ua(gaID, userId)
}

export const trackEvent = (category, action, label = null, value = null) => {
  log.info(`GA Track Event: ${category}:${action}:${label}:${value}`)

  const usr = fetchGAUser()
  if (!usr) {
    return
  }

  usr.event({
    ec: category,
    ea: action,
    el: label,
    ev: value,
  }).send()
}

export const trackException = (description, fatal = false) => {
  log.info(`GA Exception: ${description}`)
  const usr = fetchGAUser()
  if (!usr) {
    return
  }

  usr.exception(description, fatal).send()
}

export const trackScreen = (screenName) => {
  const usr = fetchGAUser()
  if (!usr) {
    return
  }

  usr.screenview(screenName, packageInfo.name, packageInfo.version).send()
  log.info(`GA Track Screen: ${screenName}`)
}

// Share with Renderer Process
global.trackEvent = trackEvent
global.trackException = trackException
global.trackScreen = trackScreen
