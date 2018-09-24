const log = require("electron-log")
const {trackException} = require("./analytics")

// Public: methods for initialising and using the project logger. Designed
// to provide a common abstract interface for project-wide logging.
//
// Examples
//
//    logger.init()
//    logger.info("Update found")
//    logger.error("Update failed to install")
export const initLogger = () => {
  log.transports.ga = (msg) => {
    if (msg.level === "error") {
      trackException(msg.data)
    }
  }
}
