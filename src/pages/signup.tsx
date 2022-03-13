import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { getSession, getCsrfToken, GetSessionParams } from 'next-auth/react'

// Components
import Layout from '@frontend/components/layout/Layout.component'
import Frame from '@frontend/components/Frame.component'
import Button from '@frontend/components/Button.component'
import InputError from '@frontend/components/InputError.component'
import MessageOnScreen from '@frontend/components/MessageOnScreen.component'

// Types
import type { SignUpCredentials, AuthResponse } from '@shared/ts/types'

// Utils and Services
import { Message } from '@frontend/ts/types'
import { signUpCredentials } from '@shared/utils/yupSchema'
import { signUp, isInUse } from '@frontend/services/auth.service'

interface SignUpProps {
  csrfToken: string;
}

interface PreErrorMessage {
  message: string | null;
}

interface PreError {
  name: PreErrorMessage;
  email: PreErrorMessage
  confirmPassword: PreErrorMessage
}

interface EventInput {
  target: {
    id: 'name' | 'email',
    value: string
  }
}

export default function SignUp({ csrfToken }: SignUpProps) {
  const router = useRouter()

  /**
   * First step: email, password and confirm password.
  *  Second step: username.
   */
  const [ firstStep, setFirstStep ] = useState(true)

  /**
   * Errors below the inputs before the data is finally sent
   */
  const [ preError, setPreError ] = useState<PreError>({
    name: { message: null },
    email: { message: null },
    confirmPassword: { message: null },
  })

  const [ message, setMessage ] = useState<Message>({ type: null, message: [] })

  const [ loading, setLoading ] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(signUpCredentials),
  })

  function onsubmit (data: any) {
    const { name, email, password, confirmPassword } = data
    const credentials: SignUpCredentials = { csrfToken, name, email, password, confirmPassword }
    onSubmitHandler(credentials)
  }

  async function onSubmitHandler(signUpCredentials: SignUpCredentials) {
    setLoading(true)

    const response = await signUp(signUpCredentials)

    setLoading(false)

    if (response.ok) {
      const { message: { success } }: AuthResponse = await response.json()

      setMessage({
        type: 'success',
        message: [ success ] as string[]
      })

      setTimeout(() => {
        router.push('/signin')
      }, 3000)

      return
    }

    const clientErrorResponses = [ 409, 400 ]
    if (clientErrorResponses.includes(response.status)) {
      const { message: { errors: {
        name,
        email,
        password,
        confirmPassword
      }}}: AuthResponse = await response.json()

      const errors = [ name, email, password, confirmPassword ].filter(err => err) as string[]

      setMessage({ type: 'error', message: errors })

      setTimeout(() => {
        setMessage({ type: null, message: [] })
      }, 8000)

      return
    }

    const serverErrorResponses = [ 500, 503 ]
    if (serverErrorResponses.includes(response.status)) {
      setMessage({ type: 'error', message: [ '¡Algo sucedió mal! Intente nuevamente.' ] })
    }
  }

  async function checkIfIsInUse(event: EventInput) {
    const { target: { id, value } } = event

    const response = await isInUse({id, value})

    if (response) {
      setPreError({
        ...preError,
        [id]: { message: `${value} ya esta siendo usado por otro usuario.`}
      })
      return
    }

    if (response === false) {
      setPreError({
        ...preError,
        [id]: { message: null }
      })
    }
  }

  /**
   * Go to the next step in registration.
   */
  function goNextStep() {
    const email: string = getValues("email")
    const password: string = getValues("password")
    const confirmPasword: string = getValues("confirmPassword")

    if (!email || !password || !confirmPasword ) {
      setMessage({ type: 'error',
        message: [ 'Es necesario completar todos los campos antes de seguir.' ],
      })

      setTimeout(() => {
        setMessage({ type: null, message: [] })
      }, 10000)

      return
    }

    if (password !== confirmPasword) {
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

    setFirstStep(false)
  }

  /**
   * Clear the message on the screen
   */
  function clearMessage() {
    setMessage({ type: null, message: [] })
  }

  return (
    <Layout hideSearchInput={true}>
      <main className="signup-main">

        <Frame>
          {
            firstStep
            ? <>
              <h1 className="font-mb">
                Registrate <span className="txt-bright-rose">gratis</span><br/>para escuchar
              </h1>

              <form onSubmit={handleSubmit(onsubmit)} noValidate>
                <div className="signup-input-container m-t-40">
                  <input id="csrfToken" name="csrfToken" type="hidden" defaultValue={csrfToken} />

                  <label className="font-m" htmlFor="email">Correo electrónico</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Correo electrónico"
                    className="signup-input font-m m-t-5"
                    {...register("email", {
                      onBlur: checkIfIsInUse
                    })}
                  />
                  
                  <InputError errors={errors.email || (preError.email.message && preError.email)} />
                </div>

                <div className="signup-input-container m-t-20">
                  <label className="font-m" htmlFor="password">Contraseña</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Contraseña"
                    className="signup-input font-m m-t-5"
                    {...register("password")}
                  />
                  <InputError errors={errors.password} />
                </div>

                <div className="signup-input-container m-t-20">
                  <label className="font-m" htmlFor="confirmPassword">Confirmar contraseña</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirmar contraseña"
                    className="signup-input font-m m-t-5"
                    {...register("confirmPassword")}
                    />
                  <InputError errors={errors.confirmPassword || (preError.confirmPassword.message && preError.confirmPassword)} />
                </div>

                <Button type="button" onClick={goNextStep} className="txt-center m-t-40">
                  <p className="font-m txt-bright-rose">
                    SIGUIENTE PASO
                  </p>
                </Button>

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
                  // name="name"
                  type="text"
                  className="signup-input font-m m-t-5"
                  placeholder="Nombre de usuario"
                  {...register("name", {
                    onBlur: checkIfIsInUse
                  })}
                />
                <InputError errors={errors.name || (preError.name.message && preError.name)} />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="txt-center m-t-40"
                onClick={handleSubmit(onsubmit)}
              >
                <p className="font-m txt-bright-rose">
                  REGISTRARSE
                </p>
              </Button>

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
  )
}

export async function getServerSideProps(context: GetSessionParams) {

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
