const mongoose = require('mongoose')
const { Schema } = mongoose

const cassetteSchema = new Schema({
  length: {
    type: Number
  },
  chunckSize: {
    type: Number
  },
  uploadDate: {
    type: Date
  },
  filename: {
    type: Number
  },
  author: {
    type: String
  },
  songName: {
    type: String
  }
})

module.exports = mongoose.models['cassettes.files'] || mongoose.model('cassettes.files', cassetteSchema)
