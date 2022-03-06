import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import Layout from '../components/Layout.component'
import Frame from '../components/Frame.component'
import ButtonThreeDimension from '../components/ButtonThreeDimension.component'
import InputError from '../components/InputError.component'
import MessageOnScreen from '../components/MessageOnScreen.component'

import { useForm } from 'react-hook-form'
import { getSession, getCsrfToken } from 'next-auth/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { signInCredentials } from '../utils/yupSchema'

export default function Login({ csrfToken }) {
  const router = useRouter()

  /**
   * Server messages.
   * type: 'error' || 'success'
   */
  const [ message, setMessage ] = useState({
    type: null,
    message: [],
  })

  /**
   * State to control when a request is being sent.
   */
  const [ loading, setLoading ] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(signInCredentials),
  })

  /**
   * Send the data entered by the user to the server to register a new user,
   * And notifies the user with a message on the screen when finished.
   * 
   * @param {Object} credentials
   * @param {String} credentials.email
   * @param {String} credentials.password
   */
  async function onSubmitHandler({ email, password }) {
    setLoading(true)

    const credentials = { csrfToken, email, password }

    const response = await fetch('/api/auth/callback/credentials', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-type': 'application/json' }
    })

    setLoading(false)

    if (response.ok) {
      router.reload()
      return
    }

    setMessage({
      type: 'error',
      message: [ 'El email o contraseña es incorrecto' ],
    })

    setTimeout(() => {
      setMessage({
        type: null,
        message: []
      })
    }, 10000)

    return
  }

  /**
   * Clear the message on the screen
   */
  function clearMessage() {
    setMessage({ type: null, message: [] })
  }

  return (
    <>
      <Layout page="profile">
        <main className="login-main">

          <Frame>
            <h1 className="font-mb">
              Para continuar,<br/>
              inicia sesión en <span className="txt-bright-rose">KSET</span>
            </h1>
            
            <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
              <div className="login-input-container m-t-40">
                <input id="csrfToken" name="csrfToken" type="hidden" defaultValue={csrfToken} />

                <label className="font-m" htmlFor="email">Correo electrónico</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Correo electrónico"
                  className="login-input font-m m-t-5"
                  {...register("email")}
                />
                <InputError errors={errors.email} />
              </div>

              <div className="login-input-container m-t-20">
                <label htmlFor="password" className="font-m">Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  className="login-input font-m m-t-5"
                  {...register("password")}
                />
                <InputError errors={errors.password} />
              </div>

              <ButtonThreeDimension className="txt-center m-t-40" type="submit">
                <p className="font-m txt-bright-rose">
                  INICIAR SESIÓN
                </p>
              </ButtonThreeDimension>
            </form>

            <div className="w-100 jc-center">
              <Link href="/signup">
                <a className="font-m m-t-20">
                  No tengo una cuenta
                </a>
              </Link>
            </div>

          </Frame>

          <MessageOnScreen message={message} onClick={clearMessage} />
        </main>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {

  const session = await getSession(context)

  if (session !== null) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false
      }
    }
  }

  return {
    props: {
      session,
      csrfToken: await getCsrfToken(context),
    },
  }
}
