import mongoose from 'mongoose'

export default function dbConnect(url: string | undefined) {
  if (!url) {
    console.error('A url is needed to connect to the database!')
    return
  }

  mongoose.connect(url)
    .then(() => console.log('DB successfully'))
    .catch(err => console.error(err))
}
