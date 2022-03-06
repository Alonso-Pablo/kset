const mongoose = require('mongoose')
const { Schema } = mongoose

const chunkSchema = new Schema({
  data: {},
  files_id: Schema.Types.ObjectId,
  n: {
    type: Number
  }
})

module.exports = mongoose.models['cassettes.chunks'] || mongoose.model('cassettes.chunks', chunkSchema)
