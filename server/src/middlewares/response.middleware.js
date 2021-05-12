
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  NOT_FOUND_MSG,
  SUCCESS_MSG,
  BAD_REQUEST_MSG
} = require('../constants/constants')

module.exports = function (req, res, next) {
  res.badRequest = function (message = BAD_REQUEST_MSG, data = {}) {
    logger.error(logger.formatReq(req, message), data)

    return res.status(BAD_REQUEST).send({
      status: BAD_REQUEST,
      message,
      data
    })
  }
  res.notFound = function (message = NOT_FOUND_MSG, data = {}) {
    logger.error(logger.formatReq(req, message), data)

    return res.status(NOT_FOUND).send({
      status: NOT_FOUND,
      message,
      data
    })
  }
  res.ok = function (data) {
    const response = {
      status: OK,
      message: SUCCESS_MSG,
      data
    }

    logger.info(logger.formatReq(req, SUCCESS_MSG))

    return res.status(OK).send(response)
  }

  next()
}
