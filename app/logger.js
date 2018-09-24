const log = require("electron-log")

// Public: methods for initialising and using the project logger. Designed
// to provide a common abstract interface for project-wide logging.
//
// Examples
//
//    logger.init()
//    logger.info("Update found")
//    logger.error("Update failed to install")
export const initLogger = () => {
  log.transports.file.level = "info"
  log.transports.ga = (msg) => {
    if (msg.level === "error") {
      // TODO: Plug in Google Analytics Exception Tracking
    }
  }
}
