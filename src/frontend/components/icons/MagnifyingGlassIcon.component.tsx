interface MagnifyingGlassIconProps {
  fillIcon?: boolean;
}

export default function MagnifyingGlassIcon({ fillIcon }: MagnifyingGlassIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
      { 
        fillIcon 
          ? <path fill="#F2EAD7" fillRule="evenodd" clipRule="evenodd" d="M20.6233 18.502C22.1139 16.5628 23 14.1349 23 11.5C23 5.14873 17.8513 0 11.5 0C5.14873 0 0 5.14873 0 11.5C0 17.8513 5.14873 23 11.5 23C14.1349 23 16.5628 22.1139 18.502 20.6233L24.4744 26.5957C25.0602 27.1815 26.01 27.1815 26.5957 26.5957C27.1815 26.01 27.1815 25.0602 26.5957 24.4744L20.6233 18.502Z" />
          : <path fill="#F2EAD7" fillRule="evenodd" clipRule="evenodd" d="M18.502 20.6233C16.5628 22.1139 14.1349 23 11.5 23C5.14873 23 0 17.8513 0 11.5C0 5.14873 5.14873 0 11.5 0C17.8513 0 23 5.14873 23 11.5C23 14.1349 22.1139 16.5628 20.6233 18.502L26.5957 24.4744C27.1815 25.0602 27.1815 26.01 26.5957 26.5957C26.01 27.1815 25.0602 27.1815 24.4744 26.5957L18.502 20.6233ZM20 11.5C20 16.1944 16.1944 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5Z" />
      }
    </svg>
  )
}

