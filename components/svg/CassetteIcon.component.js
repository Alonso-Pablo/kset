export default function CassetteIcon({
  width='42',
  height='26',
  color='#F2EAD7',
  active=false,
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      { active
        ? <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M7 0C3.13401 0 0 3.13401 0 7V19C0 22.866 3.13401 26 7 26H35C38.866 26 42 22.866 42 19V7C42 3.13401 38.866 0 35 0H7ZM11.5 15C13.433 15 15 13.433 15 11.5C15 9.567 13.433 8 11.5 8C9.567 8 8 9.567 8 11.5C8 13.433 9.567 15 11.5 15ZM30.5 15C32.433 15 34 13.433 34 11.5C34 9.567 32.433 8 30.5 8C28.567 8 27 9.567 27 11.5C27 13.433 28.567 15 30.5 15Z" fill={color}/>
        : <>
          <path fillRule="evenodd" clipRule="evenodd" d="M7 0C3.13401 0 0 3.13401 0 7V19C0 22.866 3.13401 26 7 26H35C38.866 26 42 22.866 42 19V7C42 3.13401 38.866 0 35 0H7ZM7 3C4.79086 3 3 4.79086 3 7V19C3 21.2091 4.79086 23 7 23H35C37.2091 23 39 21.2091 39 19V7C39 4.79086 37.2091 3 35 3H7Z" fill={color}/>
          <path d="M15 11.5C15 13.433 13.433 15 11.5 15C9.567 15 8 13.433 8 11.5C8 9.567 9.567 8 11.5 8C13.433 8 15 9.567 15 11.5Z" fill={color}/>
          <path d="M34 11.5C34 13.433 32.433 15 30.5 15C28.567 15 27 13.433 27 11.5C27 9.567 28.567 8 30.5 8C32.433 8 34 9.567 34 11.5Z" fill={color}/>      
        </>
      }
    </svg>
  )
}

