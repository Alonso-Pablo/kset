export default function ButtonThreeDimension({
  type='',
  click=() => {},
  text='',
  children='',
  disabled=false,
  loading=false,
  className='',
  color: {
    front='#F2EAD7',
    back='#BCAD88',
    font='#FF5959',
  } = {},
}) {

  return (
    <button onClick={click} disabled={disabled} type={type} className={`back-btn ${className}`} style={{backgroundColor: back}}>
      <div className="front-btn" style={{backgroundColor: front}}>
      { loading
        ? <div className="jc-center">
          <span className="spinner"></span>
        </div>
        : <>
          <p style={{color: font}}>
            { text }
          </p>
          { children }
        </>
      }

      </div>
    </button>
  )
}

