interface BackwardIconProps {
  className: string;
}

export default function BackwardIcon({ className }: BackwardIconProps) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="52" height="40" viewBox="0 0 52 40" fill="none">
      <path fill="#F2EAD7" fillRule="evenodd" clipRule="evenodd" d="M1.25473 19.1668C0.658906 19.5624 0.658906 20.4374 1.25473 20.833L28.4468 38.8873C29.1115 39.3286 30 38.8521 30 38.0542L30 25.3115L50.4468 38.8873C51.1115 39.3286 52 38.8521 52 38.0542L52 1.94565C52 1.1478 51.1115 0.671239 50.4468 1.11255L30 14.6883L30 1.94565C30 1.1478 29.1115 0.671239 28.4468 1.11255L1.25473 19.1668Z"/>
    </svg>
  )
}
