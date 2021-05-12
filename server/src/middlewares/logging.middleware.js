const { formatReq } = require('./response.middleware')

const getTime = () => {
  return (new Date().toISOString())
}

const formatMessage = (logType, msg, obj) => {
  let message = `[${getTime()}]:[${logType}]:${msg}`

  if (obj) {
    message += ` ${JSON.stringify(obj)}`
  }

  return message
}

const logger = {
  error: function (msg, obj = null) {
    console.error(formatMessage('ERROR', msg, obj))
  },
  info: function (msg, obj = null) {
    console.info(formatMessage('INFO', msg, obj))
  },
  debug: function (msg, obj = null) {
    console.debug(formatMessage('DEBUG', msg, obj))
  }
}

logger.formatReq = (req, msg) => {
  const ip = req.socket.remoteAddress || null

  return `[REQUEST]:[${req.method}][${ip}]: url=${req.originalUrl}, message=${msg}`
}

global.logger = logger

module.exports = function (req, _res, next) {
  logger.info(logger.formatReq(req, 'INIT_REQUEST'))

  next()
}
