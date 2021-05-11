const redis = require('redis-connection-pool')
let client

const init = async () => {
  if (!client) {
    const conf = {
      host: process.env.CACHE_HOST,
      port: process.env.CACHE_PORT || 6379,
      max_clients: 3,
      perform_checks: false,
      database: 0
    }
    client = await redis('RedisPool', conf)
  }

  return client
}
const setCache = async (key, obj) => {
  if (!process.env.CACHE_HOST) {
    return null
  }

  await init()
  let res

  await client.set(
    key,
    JSON.stringify(obj),
    (err, r) => {
      if (err) {
        logger.error(`ERROR: Trying to get cache on ${key}`)
        throw new Error(`Error getting cache for ${key}`)
      }

      res = r

      logger.info(`Returning cached info on key = '${key}'`)
    }
  )

  await client.expire(key, process.env.DEFAULT_CACHE_TTL_MINUTES)

  return res
}

const getCache = async (key) => {
  if (!process.env.CACHE_HOST) {
    return null
  }

  await init()

  let res

  await client.get(key, (err, r) => {
    if (err) {
      logger.error(`ERROR: Trying to set cache on ${key}`)
      throw new Error(`Error getting cache for ${key}`)
    }
    res = r
  })

  if (!res) {
    return null
  }

  return JSON.parse(res)
}

module.exports = { init, setCache, getCache }
