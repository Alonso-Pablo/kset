import mongoose from 'mongoose'

export default function dbConnect(url) {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  mongoose.connect(url, options)
    .then(console.log('DB successfully'))
    .catch(err => console.error(err))
}

