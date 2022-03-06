import db from '../../../lib/databaseConnect'
import Users from '../../../models/user'
import jsonStatus from '../../../lib/jsonStatus'
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
 * POST
 */
router.post(async (req, res) => {
  const {
    name,
    email,
    password,
    confirmpassword
  } = req.body

  const response = {
    success: '',
    errors: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  /**
   * Check if passwords match
   */
  if (password !== confirmpassword) {
    res.status(400).json(jsonStatus(400, {
      ...response,
      'errors': {
        ...response.errors,
        'confirmPassword': 'Las contraseñas no coinciden.'
      }
    }))

    return
  }

  /**
   * Try to save user in DB
   */
  try {
    const userCredentials = {
      name,
      email,
      password,
      'date': new Date()
    }

    const newUser = new Users(userCredentials)

    await newUser.save()

    res.status(201).json(jsonStatus(201, {
      ...response,
      success: 'Su cuenta ha sido creada exitosamente.',
    }))
  } catch (err) {
    console.error(err)

    res.status(409).json(jsonStatus(409, {
      ...response,
      'errors': {
        ...response.errors,
        'name': err.errors?.name ? err.errors.name.message : '',
        'email': err.errors?.email ? err.errors.email.message : '',
        'password': err.errors?.password ? err.errors.password.message : '',
        'confirmPassword': err.errors?.confirmpassword ? err.errors.confirmpassword.message : ''
      }
    }))
  }
})

export default router
