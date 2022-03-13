import Users from '@backend/models/user'
import type { CreateUserCredentials } from '@shared/ts/types'
import type { UserInterface } from '@shared/models/user'

// Get User
export async function getUserByName(name: string): Promise<UserInterface> {
  const user: UserInterface = await Users.findOne({ name: name }).exec()
  return user
}

export async function getUserByEmail(email: string): Promise<UserInterface> {
  const user: UserInterface = await Users.findOne({ email: email }).exec()
  return user
}

// Create User
interface CreateUserProps extends CreateUserCredentials {}

export async function createUser(credentials: CreateUserProps) {
  const newUser = new Users(credentials)
  const newUserSaved: UserInterface = await newUser.save()
  return newUserSaved
}
