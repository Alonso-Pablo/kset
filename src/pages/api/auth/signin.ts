import nextConnect from 'next-connect'
import bcrypt from 'bcrypt'
import db from '@backend/lib/databaseConnect'
import jsonStatus from '@backend/lib/jsonStatus'
import { getUserByEmail } from '@backend/services/user.service'

import type { NextApiRequest, NextApiResponse } from 'next/types'

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

interface SignInRequestBody {
  email: string;
  password: string;
}

interface UserEssential {
  name: string;
  email: string;
}

router.post(async (req, res) => {
  const { email, password }: SignInRequestBody = req.body

  const foundUser = await getUserByEmail(email)

  if (!foundUser) {
    res.status(404).json( jsonStatus(404) )
    return
  }

  const isMatch = await bcrypt.compare(password, foundUser.password)

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
