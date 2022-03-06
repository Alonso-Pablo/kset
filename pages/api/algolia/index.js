import db from '../../../lib/databaseConnect'

import Cassette from '../../../models/cassette'
import jsonStatus from '../../../lib/jsonStatus'
import nextConnect from 'next-connect'

db(process.env.DB_MONGO_URI)

import algoliasearch from 'algoliasearch/lite'
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY)
const index = client.initIndex('cassettes_index')

/**
 * Methods handler wth next-connect
 */
 const router = nextConnect({
  onError(error, req, res) {
    res.status(501).json(jsonStatus(501, error.message))
  },
  onNoMatch(req, res) {
    res.status(405).json(jsonStatus(405))
  }
})

/**
 * GET
 */
router.get(async (req, res) => {
  const foundCassettes = await Cassette.find()

  foundCassettes.forEach(cassette => {
    const newCassette = {
      ...cassette,
      objectID: cassette['_id']
    }
    cassette.objectID = cassette['_id']
    index.saveObject(newCassette)
  })

  res.status(200).json(jsonStatus(200, foundCassettes))
})

export default router