require('dotenv').config()
const express = require('express')
const logging = require('./src/middlewares/logging.middleware')
const cors = require('cors')

const app = express()

app.use(logging)
app.use(cors())

require('./src/routes')(app)

app.use(express.static('./public/'))
app.listen(process.env.PORT, () =>
  logger.info(`App listening on port ${process.env.PORT}`)
)
