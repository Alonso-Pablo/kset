import db from '../../lib/databaseConnect'
import { mongo, connection } from 'mongoose'

import Cassette from '../../models/cassette'
import jsonStatus from '../../lib/jsonStatus'
import nextConnect from 'next-connect'
import { Readable } from 'stream'
import multer from 'multer'

db(process.env.DB_MONGO_URI)

/**
 * Multer Options
 */
const oneMegabyteInBytes = 1048576
const storage = multer.memoryStorage()
const limits = {
  //  fields: 4,
  fileSize: (oneMegabyteInBytes * 4),
  files: 1,
  //  parts: 5,
}
const upload = multer({
  storage,
  limits
})

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

  const cassettes = foundCassettes.map(({ _id, author, songName }) => {
    return ({
      id: _id,
      author,
      songName,
    })
  })

  res.status(200).json({items: cassettes})
})

/**
 * POST
 */
 router.post((req, res) => {
  if (!req.headers['content-length']) {
    res.status(411).json(jsonStatus(411))
    return
  }

  upload.single('cassette')(req, res, async (error) => {
    if (error) {
      console.error(error)
      res.status(400).json(jsonStatus(400, error.message))
      return
    }

    const { songName, author } = req.body

    
    if (!songName && !author) {
      res.status(400).json(jsonStatus(400))
      return
    }

    const readableCassetteStream = new Readable()
    readableCassetteStream.push(req.file.buffer)
    readableCassetteStream.push(null)

    const { db } = connection
    const bucket = new mongo.GridFSBucket(db, {
      bucketName: 'cassettes'
    })

    const uploadStream = bucket.openUploadStream(`${songName} - ${author}`)
    const { id } = uploadStream
    readableCassetteStream.pipe(uploadStream)

    uploadStream.on('error', () => {
      res.status(500).json(jsonStatus(500))
      return
    })

    uploadStream.on('finish', async () => {
      await Cassette.findOneAndUpdate({ _id: id }, { songName, author })
      res.status(201).json(jsonStatus(200, id))
    })
  })
})

export const config = {
  api: {
      bodyParser: false
  }
}

export default router
