import Cassette from '@backend/models/cassette'
import { CassetteInterface } from '@shared/models/cassette'
import { GridFSBucketWriteStream, ObjectId } from 'mongodb'
import { mongo, connection } from 'mongoose'
import { Readable } from 'stream'

interface CreateCassetteParams {
  songName: string;
  author: string;
  buffer: ArrayBufferLike;
}

interface UpdatedCassetteData {
  author?: string;
  songName?: string;
  filename?: string,
}

/**
 * Get Cassettes
 */
export async function getCassettes(): Promise<CassetteInterface[]> {
  const foundRecords = await Cassette.find()

  const cassettes: CassetteInterface[] = foundRecords.map(register => {
    const cassette: CassetteInterface = register._doc

    return ({
      ...cassette,
      id: cassette._id.toString(),
    })
  })

  return cassettes
}

export async function getCassetteById(id: ObjectId): Promise<CassetteInterface> {
  const foundCassette = await Cassette.findOne({ _id: id })
  return foundCassette
}

/**
 * Create Cassette
 */
export async function createCassette(createCassetteParams: CreateCassetteParams): Promise<GridFSBucketWriteStream> {

  const { songName, author, buffer } = createCassetteParams

  const readableCassetteStream = new Readable()
  readableCassetteStream.push(buffer)
  readableCassetteStream.push(null)

  const { db } = connection

  const bucket = new mongo.GridFSBucket(db, { bucketName: 'cassettes' })
  
  const filename = `${songName} - ${author}`
  const uploadStream = bucket.openUploadStream(filename)
  readableCassetteStream.pipe(uploadStream)

  return uploadStream
}

/**
 * Update Cassette
 */
export async function updateCassette(
  id: ObjectId | GridFSBucketWriteStream["id"], updatedCassetteData: UpdatedCassetteData
): Promise<void> {
  await Cassette.findOneAndUpdate({ _id: id }, updatedCassetteData)
}

/**
 * Delete 
 */
export async function deleteCassetteById(id: ObjectId): Promise<any> {
  const cassetteDeleted = await Cassette.findOne({ _id: id }).deleteOne().exec()
  return cassetteDeleted
}