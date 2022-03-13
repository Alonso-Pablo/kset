import ErrorIcon from "@frontend/components/icons/ErrorIcon.component"

interface InputErrorProps {
  errors?: { message: string };
}

export default function InputError({ errors }: InputErrorProps) {
  return (
    <div className="input-error-container m-t-5">
      { errors && <ErrorIcon /> }
      <span className="txt-bright-rose m-l-5 font-s">
        { errors && errors.message }
      </span>
    </div>
  )
}
