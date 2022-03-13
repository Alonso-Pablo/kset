interface ErrorIconProps {
  className?: string;
}

export default function ErrorIcon({ className }: ErrorIconProps) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path fill="#FF5959" d="M15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5Z" />
      <path fill="#F2EAD7" d="M8.50515 2.93182L8.31818 9.80646H6.56357L6.3718 2.93182H8.50515ZM7.44087 12.8746C7.12447 12.8746 6.85281 12.7628 6.62589 12.5391C6.39897 12.3121 6.28711 12.0405 6.29031 11.7241C6.28711 11.4109 6.39897 11.1424 6.62589 10.9187C6.85281 10.695 7.12447 10.5831 7.44087 10.5831C7.7445 10.5831 8.01136 10.695 8.24148 10.9187C8.47159 11.1424 8.58825 11.4109 8.59144 11.7241C8.58825 11.935 8.53232 12.1284 8.42365 12.3042C8.31818 12.4767 8.17916 12.6158 8.00657 12.7212C7.83398 12.8235 7.64542 12.8746 7.44087 12.8746Z" />
    </svg>
  )
}
