import db from '../../../lib/databaseConnect'
import Users from '../../../models/user'
import jsonStatus from '../../../lib/jsonStatus'
import nextConnect from 'next-connect'
import bcrypt from 'bcrypt'

db(process.env.DB_MONGO_URI)

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

router.post(async (req, res) => {
  const { email, password } = req.body

  /**
   * Search for the user by email and if it is not found, we return a 404 error.
   */
  const foundUser = await Users.findOne({ email: `${email}` }).exec()

  if (!foundUser) {
    res.status(404).json( jsonStatus(404) )
    return
  }

  /**
   * Compare the password with the encrypted password stored in the database
   */
  const isMatch = await bcrypt.compare(`${password}`, foundUser.password)

  if (!isMatch) {
    res.status(404).json( jsonStatus(404) )
    return
  }

  const user = {
    name: foundUser.name,
    email: foundUser.email
  }

  res.status(200).json( jsonStatus(200, user) )
  return
})

export default router
