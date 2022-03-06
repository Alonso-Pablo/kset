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
import { signUpCredentials } from '../utils/yupSchema'
import { emailRegex } from '../utils/regexs'

export default function Register({ csrfToken }) {
  const router = useRouter()

  /**
   * First step: email, password and confirm password.
  *  Second step: username.
   */
  const [ firstStep, setFirstStep ] = useState(true)

  /**
   * Errors below the inputs before the data is finally sent
   */
  const [ preError, setPreError ] = useState({
    name: { message: null },
    email: { message: null },
    confirmPassword: { message: null },
  })

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
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(signUpCredentials),
  })

  /**
   * Send the data entered by the user to the server to register a new user,
   * And notifies the user with a message on the screen when finished.
   * 
   * @param {Object} credentials
   * @param {String} credentials.name
   * @param {String} credentials.email
   * @param {String} credentials.password
   * @param {String} credentials.confirmpassword
   */
  async function onSubmitHandler({ name, email, password, confirmpassword }) {
    setLoading(true)

    const credentials = { csrfToken, name, email, password, confirmpassword }

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-type': 'application/json' }
    })

    setLoading(false)

    if (response.status === 201) {
      const { message } = await response.json()

      setMessage({
        type: 'success',
        message: [ message.success ],
      })

      setTimeout(() => {
        router.push('/signin')
      }, 3000)

      return
    }

    if (response.status === 409 || response.status === 400) {
      const { message: { errors: {
        name,
        email,
        password,
        confirmPassword
      } } } = await response.json()

      const errors = [ name, email, password, confirmPassword ].filter(err => err)

      setMessage({
        type: 'error',
        message: errors,
      })

      setTimeout(() => {
        setMessage({
          type: null,
          message: []
        })
      }, 8000)

      return
    }

    if (response.status === 500) {
      setMessage({
        type: 'error',
        message: [ '¡Algo sucedio mal!' ],
      })

      return
    }
  }

  /**
   * It asks the server if the email to register is already being used by another user.
   * If the email is being used the user is warned with an error below the input.
   * 
   * @param {Event} e
   * @param {EventTarget} e.target
   * @param {String} e.target.value
   */
  async function checkIfEmailIsInUse({ target: { value: email } }) {
    if (emailRegex.test(email)) {
      const response = await fetch(`/api/user?email=${email}`, { method: 'GET' })

      if (response.status === 500) {
        return
      }

      const { statusCode, message } = await response.json()

      if (statusCode === 409) {
        setPreError({
          ...preError,
          email: { message: message.errors.email }
        })
        return
      }

      if (statusCode === 200 && preError.email.message) {
        setPreError({
          ...preError,
          email: { message: null }
        })
      }
    }
  }

    /**
   * It asks the server if the username to register is already being used by another user.
   * If the username is being used the user is warned with an error below the input.
   *
   * @param {Event} e
   * @param {EventTarget} e.target
   * @param {String} e.target.value
   */
  async function checkIfNameIsInUse({ target: { value: name } }) {
    const response = await fetch(`/api/user?name=${name}`, { method: 'GET' })

    if (response.status === 500) {
      return
    }

    const { statusCode, message } = await response.json()

    if (statusCode === 409 ) {
      setPreError({
        ...preError,
        name: { message: message.errors.name }
      })
      return
    }

    if (statusCode === 200 && preError.name.message) {
      setPreError({
        ...preError,
        name: { message: null }
      })
      return
    }
  }

  /**
   * Go to the next step in registration.
   */
  function nextStep() {
    const { value: email } = document.getElementById('email')
    const { value: password } = document.getElementById('password')
    const { value: confirmpassword } = document.getElementById('confirmpassword')

    if (!email || !password || !confirmpassword ) {
      setMessage({
        type: 'error',
        message: [ 'Es necesario completar todos los campos antes de seguir.' ],
      })

      setTimeout(() => {
        setMessage({
          type: null,
          message: []
        })
      }, 10000)

      return
    }

    if (password !== confirmpassword) {
      setPreError({
         ...preError,
        confirmPassword: { message: 'Las contraseñas tienen que coincidir.' }
      })
      return
    }

    if (preError.confirmPassword.message) {
      setPreError({
        ...preError,
        confirmPassword: { message: null }
      })
    }

    if (errors.email || preError.email.message){
      return
    }

    setFirstStep(!firstStep)
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
        <main className="signup-main">

          <Frame>
            {
              firstStep
              ? <>
                <h1 className="font-mb">
                  Registrate <span className="txt-bright-rose">gratis</span><br/>para escuchar
                </h1>

                <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
                  <div className="signup-input-container m-t-40">
                    <input id="csrfToken" name="csrfToken" type="hidden" defaultValue={csrfToken} />

                    <label className="font-m" htmlFor="email">Correo electrónico</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Correo electrónico"
                      className="signup-input font-m m-t-5"
                      {...register("email", {
                        onBlur: checkIfEmailIsInUse
                      })}
                    />
                    
                    <InputError errors={errors.email || (preError.email.message && preError.email)} />
                  </div>

                  <div className="signup-input-container m-t-20">
                    <label className="font-m" htmlFor="password">Contraseña</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Contraseña"
                      className="signup-input font-m m-t-5"
                      {...register("password")}
                    />
                    <InputError errors={errors.password} />
                  </div>

                  <div className="signup-input-container m-t-20">
                    <label className="font-m" htmlFor="confirmpassword">Confirmar contraseña</label>
                    <input
                      id="confirmpassword"
                      name="confirmpassword"
                      type="password"
                      placeholder="Confirmar contraseña"
                      className="signup-input font-m m-t-5"
                      {...register("confirmpassword")}
                      />
                    <InputError errors={errors.confirmpassword || (preError.confirmPassword.message && preError.confirmPassword)} />
                  </div>

                  <ButtonThreeDimension type="button" click={nextStep} className="txt-center m-t-40">
                    <p className="font-m txt-bright-rose">
                      SIGUIENTE PASO
                    </p>
                  </ButtonThreeDimension>

                  <div className="w-100 jc-center">
                    <Link href="/signin">
                      <a className="font-m m-t-20">
                        ¡Ya tengo una cuenta!
                      </a>
                    </Link>
                  </div>

                </form>
              </>

              : <>
                <h1 className="font-mb">
                  <span className="txt-bright-rose">Por último,</span><br/>
                  ¿Cómo quieres<br/>que te llamemos? 
                </h1>

                <div className="signup-input-container m-t-40">
                  <label className="font-m" htmlFor="name">Nombre de usuario</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="signup-input font-m m-t-5"
                    placeholder="Nombre de usuario"
                    {...register("name", {
                      onBlur: checkIfNameIsInUse
                    })}
                  />
                  <InputError errors={errors.name || (preError.name.message && preError.name)} />
                </div>

                <ButtonThreeDimension
                  type="submit"
                  disabled={loading}
                  className="txt-center m-t-40"
                  click={handleSubmit(onSubmitHandler)}
                >
                  <p className="font-m txt-bright-rose">
                    REGISTRARSE
                  </p>
                </ButtonThreeDimension>

                <button onClick={() => setFirstStep(true)} className="w-100 jc-center font-m m-t-20 bg-transparent br-none pointer">
                  <p className="font-m txt-bright-cream">
                    Volver atrás
                  </p>
                </button>
              </>
            }
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
