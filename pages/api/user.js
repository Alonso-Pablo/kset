import db from '../../lib/databaseConnect'
import Users from '../../models/user'
import jsonStatus from '../../lib/jsonStatus'
import nextConnect from 'next-connect'

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

/**
 * GET
 */
router.get(async (req, res) => {
  const { name, email } = req.query

  const response = {
    success: '',
    errors: {
      name: '',
      email: '',
    }
  }

  /**
   * Check if name is already in use
   */
  if (name) {
    const foundUser = await Users.findOne({ name: `${name}` }).exec()

    if (foundUser) {
      res.status(409).json(jsonStatus(409, {
        ...response,
        'errors': {
          ...response.errors,
          'name': 'Este nombre de usuario ya esta siendo usado.',
        }
      }))

      return
    }

    res.status(200).json(jsonStatus(200))
    return
  }

  /**
   * Check if email is already in use
   */
  if (email) {
    const foundUser = await Users.findOne({ email: `${email}` }).exec()

    if (foundUser) {
      res.status(409).json(jsonStatus(409, {
        ...response,
        'errors': {
          ...response.errors,
          'email': 'Este correo electrónico ya esta siendo usado.',
        }
      }))

      return
    }

    res.status(200).json(jsonStatus(200))
    return
  }

  res.status(400).json(400)
})

export default router
