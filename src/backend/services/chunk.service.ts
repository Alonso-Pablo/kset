import { ObjectId } from 'mongodb'
import Chunk from '@backend/models/chunk'

export async function deleteChunksByCassetteId(id: ObjectId): Promise<any> {
  const chunksDeleted = await Chunk.find({ files_id: id }).deleteMany().exec()
  return chunksDeleted
}