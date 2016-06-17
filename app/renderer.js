const logger = require("./logger")

setInterval(() => {
  logger.info("Info!")
  logger.warning("Warning!")
  logger.debug("Debug!")
  logger.error("Error!")
}, 1000)
