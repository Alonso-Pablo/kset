import * as yup from 'yup'
import { nameRegex, emailRegex, passwordRegex } from './regexs'

const signInCredentials = yup.object().shape({
  email: yup
    .string()
    .email('No es un email valido.')
    .matches(emailRegex, 'No es un email valido.')
    .required('Este campo es requerido.'),
  password: yup
    .string()
    .min(8, 'La contraseña tiene que tener mínimo 8 caracteres.')
    .max(99, 'La contraseña tiene que tener como maximo 99 caracteres.')
    .required('Este campo es requerido.'),
})

const signUpCredentials = yup.object().shape({
  name: yup
    .string()
    .min(4, 'El nombre de usuario no puede contener menos de 4 caracteres.')
    .max(16, 'El nombre de usuario no puede contener mas de 16 caracteres.')
    .matches(nameRegex, 'El formato de nombre de usuario ingresado es invalido.')
    .required('Este campo es requerido.'),
  email: yup
    .string()
    .email('No es un email valido.')
    .matches(emailRegex, 'No es un email valido.')
    .required('Este campo es requerido.'),
  password: yup
    .string()
    .min(8, 'La contraseña tiene que tener mínimo 8 caracteres.')
    .max(99, 'La contraseña tiene que tener como maximo 99 caracteres.')
    .matches(passwordRegex, 'La contraseña no es valida; debe tener por lo menos un número.')
    .required('Este campo es requerido.'),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas tienen que coincidir.')
    .required('Este campo es requerido.'),

})

export { signInCredentials, signUpCredentials }
