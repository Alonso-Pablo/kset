import nextConnect from 'next-connect'
import db from '@backend/lib/databaseConnect'
import jsonStatus from '@backend/lib/jsonStatus'

// Types
import type { NextApiRequest, NextApiResponse } from 'next/types'
import type { MessageResponse, SignUpCredentials } from '@shared/ts/types'
import type { CreateUserCredentials } from '@shared/ts/types'
import { createUser } from '@backend/services/user.service'

db(process.env.DB_MONGO_URI)

/**
 * Methods handler wth next-connect
 */
 const router = nextConnect<NextApiRequest,NextApiResponse>({
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
  const { name, email, password, confirmPassword }: SignUpCredentials = req.body

  const response: MessageResponse = {
    success: null,
    errors: {
      name: null,
      email: null,
      password: null,
      confirmPassword: null
    }
  }

  if (password !== confirmPassword) {
    res.status(400).json(jsonStatus(400, {
      ...response,
      'errors': {
        ...response.errors,
        'confirmPassword': 'Las contraseñas no coinciden.'
      }
    }))

    return
  }

  try {
    const userCredentials: CreateUserCredentials = {
      name,
      email,
      password,
      date: new Date()
    }

    await createUser(userCredentials)

    res.status(201).json(jsonStatus(201, {
      ...response,
      success: 'Su cuenta ha sido creada exitosamente.',
    }))
  } catch (err: any) {
    console.error(err)

    res.status(409).json(jsonStatus(409, {
      ...response,
      'errors': {
        ...response.errors,
        'name': err.errors?.name ? err.errors.name.message : null,
        'email': err.errors?.email ? err.errors.email.message : null,
        'password': err.errors?.password ? err.errors.password.message : null,
        'confirmPassword': err.errors?.confirmPassword ? err.errors.confirmPassword.message : null
      }
    }))
  }
})

export default router
