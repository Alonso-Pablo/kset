import multer from 'multer'
import { NextApiRequest, NextApiResponse } from 'next/types'
import nextConnect from 'next-connect'
import jsonStatus from '@backend/lib/jsonStatus'
import dbConnect from '@backend/lib/databaseConnect'
import { CassetteInterface } from '@shared/models/cassette'

// Services
import { createCassette, getCassettes, updateCassette } from '@backend/services/cassette.service'


dbConnect(process.env.DB_MONGO_URI)

/**
 * Multer Options
 */
const oneMegabyteInBytes = 1048576
const storage = multer.memoryStorage()
const limits = {
  fields: 4,
  fileSize: (oneMegabyteInBytes * 4),
  files: 1,
  parts: 5,
}
const upload = multer({
  storage,
  limits
})

/**
 * Methods handler with next-connect
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
router.get( async (req: NextApiRequest, res: NextApiResponse) => {

  const cassettes: CassetteInterface[] = await getCassettes()

  res.status(200).json(jsonStatus(200,{ items: cassettes }))
})

/**
 * POST
 */
 router.post((req: any, res: any) => {
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

    const { songName, author }: { songName: string, author: string} = req.body

    if (!songName || !author) {
      res.status(400).json(jsonStatus(400))
      return
    }

    const { buffer }: Buffer = req.file

    const uploadStream = await createCassette({ songName, author, buffer })
    
    const newCassetteId = uploadStream.id

    uploadStream.on('error', () => {
      res.status(500).json(jsonStatus(500))
      return
    })

    uploadStream.on('finish', async () => {
      await updateCassette( newCassetteId, { songName, author } )
      res.status(201).json(jsonStatus(201, newCassetteId.toString()))
    })

  })
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default router
