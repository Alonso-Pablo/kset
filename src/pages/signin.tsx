import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { getSession, getCsrfToken, GetSessionParams } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Components
import Layout from '@frontend/components/layout/Layout.component'
import Frame from '@frontend/components/Frame.component'
import Button from '@frontend/components/Button.component'
import InputError from '@frontend/components/InputError.component'
import MessageOnScreen from '@frontend/components/MessageOnScreen.component'

// Types
import type { Message } from '@frontend/ts/types'
import type { LogInCredentials } from '@shared/ts/types'

// Utils and Services
import { signInCredentials } from '@shared/utils/yupSchema'
import { logIn } from '@frontend/services/auth.service'


interface LoginProps {
  csrfToken: string;
}

export default function Login({ csrfToken }: LoginProps) {
  const router = useRouter()

  const [ message, setMessage ] = useState<Message>({ type: null, message: [] })

  const [ loading, setLoading ] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(signInCredentials),
  })

  function onsubmit (data: any) {
    const { email, password } = data
    const credentials: LogInCredentials = { csrfToken, email, password }
    onSubmitHandler(credentials)
  }

  async function onSubmitHandler(LogInCredentials: LogInCredentials) {
    setLoading(true)

    const response = await logIn(LogInCredentials)

    setLoading(false)

    if (response.ok) {
      router.reload()
      return 
    }

    setMessage({ type: 'error', message: [ 'El email o contraseña es incorrecto' ] })

    setTimeout(() => {
      setMessage({ type: null, message: [] })
    }, 10000)
  }

  function clearMessage(): void {
    setMessage({ type: null, message: [] })
  }

  return (
    <Layout hideSearchInput={true}>
      <main className="login-main">

        <Frame>
          <h1 className="font-mb">
            Para continuar,<br/>
            inicia sesión en <span className="txt-bright-rose">KSET</span>
          </h1>
          
          <form onSubmit={handleSubmit(onsubmit)} noValidate>
            <div className="login-input-container m-t-40">
              <input id="csrfToken" name="csrfToken" type="hidden" defaultValue={csrfToken} />

              <label className="font-m" htmlFor="email">Correo electrónico</label>
              <input
                id="email"
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
                type="password"
                placeholder="Contraseña"
                className="login-input font-m m-t-5"
                {...register("password")}
              />
              <InputError errors={errors.password} />
            </div>

            <Button loading={loading} disabled={loading} className="txt-center m-t-40" type="submit">
              <p className="font-m txt-bright-rose">
                INICIAR SESIÓN
              </p>
            </Button>
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
  )
}

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context)
  const csrfToken = await getCsrfToken(context) as string

  if (session !== null) {
    return {
      redirect: {
        destination: '/profile',
        permanent: true
      }
    }
  }

  return {
    props: {
      session,
      csrfToken,
    },
  }
}
