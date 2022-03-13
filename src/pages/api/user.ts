import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next/types'
import dbConnect from '@backend/lib/databaseConnect'
import jsonStatus from '@backend/lib/jsonStatus'
import { UserInterface } from '@shared/models/user'

// Services
import { getUserByEmail, getUserByName } from '@backend/services/user.service'

dbConnect(process.env.DB_MONGO_URI)

/**
 * Methods handler with next-connect
 */
const router = nextConnect<NextApiRequest,NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json(jsonStatus(501, error.message))
  },
  onNoMatch(req, res) {
    res.status(405).json(jsonStatus(405))
  }
})

interface GetRequestQuery {
  name?: string;
  email?: string;
}

interface GetResponse {
  success: string | null;
  errors: { name: string | null, email: string | null };
}

/**
 * GET
 */
router.get(async (req, res) => {
  const { name, email }: GetRequestQuery = req.query

  const response: GetResponse = {
    success: null,
    errors: {
      name: null,
      email: null,
    }
  }

  /**
   * Check if name is already in use
   */
  if (name) {
    const foundUser: UserInterface = await getUserByName(name)

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
    const foundUser: UserInterface = await getUserByEmail(email)

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
