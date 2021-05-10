const logger = {
  error: function (msg, obj = null) {
    if (obj) {
      console.error(msg, obj)
    }

    console.error(msg)
  },
  info: function (msg, obj = null) {
    if (obj) {
      console.info(msg, obj)
    }
    console.info(msg)
  }
}

global.logger = logger

module.exports = function (error, req, _res, next) {
  if (error) {
    logger.error('ERROR:', error)
  } else {
    logger.info(`INFO: request ${req.method}, ${req.originalUrl}`)
  }

  next()
}
