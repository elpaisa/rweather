const getTime = () => {
  return (new Date().toISOString());
}

const logger = {
  error: function (msg, obj = null) {
    const message = `[${getTime()}]:[ERROR] ${msg}`;
    if (obj) {
      console.error(message, obj)
    }

    console.error(message)
  },
  info: function (msg, obj = null) {
    const message = `[${getTime()}]:[INFO] ${msg}`;
    if (obj) {
      console.info(message, obj)
    }
    console.info(message)
  }
}

global.logger = logger

module.exports = function (req, _res, next) {
  logger.info(`[REQUEST]:[${req.method}], ${req.originalUrl}`)

  next()
}
