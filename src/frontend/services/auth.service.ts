import { LogInCredentials, SignUpCredentials } from '@shared/ts/types'

// Log In
export async function logIn(logInCredentials: LogInCredentials): Promise<Response> {
  const response = await fetch('/api/auth/callback/credentials', {
    method: 'POST',
    body: JSON.stringify(logInCredentials),
    headers: { 'Content-type': 'application/json' }
  })

  return response
}


// Sign Up
export async function signUp(signUpCredentials: SignUpCredentials): Promise<Response> {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(signUpCredentials),
    headers: { 'Content-type': 'application/json' }
  })

  return response
}


// Others

interface isInUseParams {
  id: 'name' | 'email';
  value: string;
}

export async function isInUse({id, value}: isInUseParams): Promise<boolean | null> {
  const { status } = await fetch(`/api/user?${id}=${value}`)

  const conflictResponse = 409
  if (status === conflictResponse) {
    return true
  }

  const sucessResponse = 200
  if (status === sucessResponse) {
    return false
  }

  return null
}