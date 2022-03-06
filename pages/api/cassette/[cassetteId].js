import db from '../../../lib/databaseConnect'
import { mongo, connection } from 'mongoose'
import Cassette from '../../../models/cassette'
import Chunk from '../../../models/chunk'

import nextConnect from 'next-connect'

import jsonStatus from '../../../lib/jsonStatus'

db(process.env.DB_MONGO_URI)

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
  let cassetteID

  try {
    cassetteID = new mongo.ObjectId(req.query.cassetteId)
  } catch (error) {
    return res.status(400).json(jsonStatus(400, error))
  }

  const { author, songName } = await Cassette.findOne({ _id: cassetteID })

  res.setHeader('cassette-author', author)
  res.setHeader('cassette-song-name', songName)
  res.setHeader('content-type', 'audio/mpeg')
  res.setHeader('accept-ranges', 'bytes')

  const { db } = connection
  const bucket = new mongo.GridFSBucket(db, {
    bucketName: 'cassettes'
  })

  const downloadStream = bucket.openDownloadStream(cassetteID)

  downloadStream.on('data', chunk => {
    res.write(chunk)
  })

  downloadStream.on('error', () => {
    res.status(404).json(jsonStatus(404))
  })

  downloadStream.on('end', () => {
    res.end()
  })
})

/**
 * DELETE
 */
router.delete(async (req, res) => {
  let cassetteID

  try {
    cassetteID = new mongo.ObjectId(req.query.cassetteId)
  } catch (error) {
    return res.status(400).json(jsonStatus(400, error))
  }

  /**
   * Delete the records of cassettes that contain the id passed by query
   */
  const cassette = await Cassette.find({ _id: cassetteID }).deleteMany().exec()
  /**
   * Delete the records of cassette chunks that are associated with the id passed by query
   */
  const chunks = await Chunk.find({ files_id: cassetteID }).deleteMany().exec()

  if (!cassette.deletedCount && !chunks.deletedCount) {
    return res.status(404).json(jsonStatus(404))
  }

  res.status(200).json( jsonStatus(200, `Deleted cassette (id: ${req.query.cassetteId}) and ${chunks.deletedCount} chunks`) )
})



export default router
