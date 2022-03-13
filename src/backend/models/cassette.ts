import { Schema, models, model } from 'mongoose'
import { CassetteInterface } from '@shared/models/cassette'

const cassetteSchema = new Schema<CassetteInterface>({
  length: {
    type: Number,
    required: true
  },
  chunkSize: {
    type: Number,
    required: true
  },
  uploadDate: {
    type: Date,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  songName: {
    type: String,
    required: true
  }
})

export default models['cassettes.files'] || model<CassetteInterface>('cassettes.files', cassetteSchema)
