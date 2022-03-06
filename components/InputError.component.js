import ErrorIcon from "./svg/ErrorIcon.component"

export default function InputError({ errors }) {
  return (
    <div className="input-error-container m-t-5">
      { errors && <ErrorIcon /> }
      <span className="txt-bright-rose m-l-5 font-s">{ errors && errors.message }</span>
    </div>
  )
}
