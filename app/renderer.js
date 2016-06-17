const logger = require("./renderer-logger")

setInterval(() => {
  logger.info("Browser log!")
}, 1000)
