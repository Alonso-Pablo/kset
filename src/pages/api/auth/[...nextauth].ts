import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        const payload = {
          email: credentials!.email,
          password: credentials!.password
        }

        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/signin`, {
          method: req.method,
          body: JSON.stringify(payload),
          headers: { 'Content-type': 'application/json', }
        })

        const { message: user } = await res.json()

        if (res.ok && user) {
          return user
        }

        return null
      },
      credentials: { email: {}, password: {} }
    })
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    // jwt: true,
    strategy: 'jwt',
    maxAge: 60 * 15, // 15min
  },
  jwt: {
    secret: process.env.AUTH_JWT_SECRET,
    // signingKey: process.env.AUTH_JWT_SIGNING_KEY,
    // encryption: true,
    // encryptionKey: process.env.AUTH_JWT_ENCRYPTION_KEY,
  },
  secret: process.env.AUTH_JWT_SECRET,
  debug: true,
})
