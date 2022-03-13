import { ReactElement } from 'react'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  text?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  children: ReactElement | null;
  onClick?: () => void;
}

export default function Button({
  type = 'button',
  text = undefined,
  className = undefined,
  disabled = false,
  loading = false,
  children = null,
  onClick = () => {},
}: ButtonProps) {

  return (
    <button 
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      className={`back-btn ${className}`}
    >
      <div className="front-btn">
        { 
          loading
            ? <div className="jc-center"><span className="spinner"></span></div>
            : <>
                <p className='txt-bright-rose'>{ text }</p>
                { children }
              </>
        }
      </div>
    </button>
  )
}

