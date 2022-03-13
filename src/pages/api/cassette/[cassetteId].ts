import { NextApiRequest, NextApiResponse } from 'next/types'
import nextConnect from 'next-connect'
import { mongo, connection } from 'mongoose'
import db from '@backend/lib/databaseConnect'
import jsonStatus from '@backend/lib/jsonStatus'

// Services
import { deleteCassetteById, getCassetteById } from '@backend/services/cassette.service'
import { deleteChunksByCassetteId } from '@backend/services/chunk.service'

db(process.env.DB_MONGO_URI)

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
  const queryId = req.query.cassetteId as string
  let cassetteId

  try {
    cassetteId = new mongo.ObjectId(queryId)
  } catch (error) {
    console.error(error)
    return res.status(400).json(jsonStatus(400, error))
  }

  const { author, songName } = await getCassetteById(cassetteId)
  res.setHeader('cassette-author', author)
  res.setHeader('cassette-song-name', songName)
  res.setHeader('content-type', 'audio/mpeg')
  res.setHeader('accept-ranges', 'bytes')

  const { db } = connection
  const bucket = new mongo.GridFSBucket(db, { bucketName: 'cassettes' })
  const downloadStream = bucket.openDownloadStream(cassetteId)

  downloadStream.on('data', (chunk: Buffer) => {
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
  const queryId = req.query.cassetteId as string
  let cassetteID

  try {
    cassetteID = new mongo.ObjectId(queryId)
  } catch (error) {
    return res.status(400).json(jsonStatus(400, error))
  }

  const cassetteDeleted = await deleteCassetteById(cassetteID)
  const chunksDeleted = await deleteChunksByCassetteId(cassetteID)

  if (!cassetteDeleted.deletedCount && !chunksDeleted.deletedCount) {
    return res.status(404).json(jsonStatus(404))
  }

  res.status(200).json(
    jsonStatus(200, `Deleted cassette (id: ${req.query.cassetteId}) and ${chunksDeleted.deletedCount} chunks`)
  )
})

export default router
