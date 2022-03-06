export default function SuccessIcon({ border }) {
  return (
    <svg className={border && "message-icon"} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5Z" fill="#2FBD18"/>
      <path d="M12.9378 4.87279L11.665 3.6L5.8689 9.3961L3.6728 7.20001L2.4 8.4728L5.86842 11.9412L6.14908 11.6605L6.14956 11.661L12.9378 4.87279Z" fill="#F2EAD7"/>
    </svg>
  )
}
