import nextConnect from 'next-connect'

import db from '@backend/lib/databaseConnect'
import jsonStatus from '@backend/lib/jsonStatus'
import algoliasearch from 'algoliasearch/lite'
import { getCassettes } from '@backend/services/cassette.service'
import type { NextApiRequest, NextApiResponse } from 'next/types'

db(process.env.DB_MONGO_URI)

const client = algoliasearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_API_KEY!)
const index: any = client.initIndex('cassettes_index')

/**
 * Methods handler wth next-connect
 */
 const router = nextConnect<NextApiRequest,NextApiResponse>({
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
  const foundCassettes = await getCassettes()

  foundCassettes.forEach(cassette => {
    const newCassette = {
      ...cassette,
      objectID: cassette['id']
    }
    index.saveObject(newCassette)
  })

  res.status(200).json(jsonStatus(200, foundCassettes))
})

export default router