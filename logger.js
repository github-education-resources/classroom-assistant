const winston = require("winston")

// Public: methods for initialising and using the project logger. Designed
// to provide a common abstract interface for project-wide logging.
//
// Examples
//
//    logger.init()
//    logger.info("Update found")
//    logger.error("Update failed to install")
module.exports = {
  init() {
    winston.add(winston.transports.File, {
      filename: "./app.log"
    })
  },

  info(message) {
    winston.info(message)
  },

  warning(message) {
    winston.warn(message)
  },

  error(message) {
    winston.error(message)
  },

  debug(message) {
    winston.debug(message)
  }
}
