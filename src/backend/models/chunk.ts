import { Schema, models, model, ObjectId } from 'mongoose'

interface CassetteChunk {
  data: BinaryType;
  files_id: ObjectId;
  n: number;
}

const chunkSchema = new Schema<CassetteChunk>({
  data: {},
  files_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  n: {
    type: Number,
    required: true
  }
})

export default models['cassettes.chunks'] || model('cassettes.chunks', chunkSchema)
