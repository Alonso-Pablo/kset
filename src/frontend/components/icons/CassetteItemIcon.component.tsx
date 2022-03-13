import { CassetteColors } from "@shared/models/cassette";

interface CassetteItemIconProps {
  colors: CassetteColors;
  className?: string;
}

export default function CassetteItemIcon({
  colors: {
    body,
    holes,
    strips: {
      upper,
      middle,
      bottom,
    },
  },
  className,
}: CassetteItemIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 140 89.36" fill="none">
      <path fill={body}  d="M0 4C0 1.79086 1.79086 0 4 0H137C139.209 0 140 1.79086 140 4V86C141 88.2091 139.209 90 137 90H4C1.79086 90 0 88.2091 0 86V4Z" />
      <path fill={holes} d="M54 80C54 81.6569 52.6569 83 51 83C49.3431 83 48 81.6569 48 80C48 78.3431 49.3431 77 51 77C52.6569 77 54 78.3431 54 80Z" />
      <path fill={holes} d="M93 80C93 81.6569 91.6569 83 90 83C88.3431 83 87 81.6569 87 80C87 78.3431 88.3431 77 90 77C91.6569 77 93 78.3431 93 80Z" />
      <path fill={holes} d="M106 82C106 83.6569 104.657 85 103 85C101.343 85 100 83.6569 100 82C100 80.3431 101.343 79 103 79C104.657 79 106 80.3431 106 82Z" />
      <path fill={holes} d="M41 82C41 83.6569 39.6569 85 38 85C36.3431 85 35 83.6569 35 82C35 80.3431 36.3431 79 38 79C39.6569 79 41 80.3431 41 82Z" />
      <path fill={bottom} d="M9 53H131V62H9V53Z" />
      <path fill={middle} d="M9 28H131V53H9V28Z" />
      <path fill={upper} d="M9 12C9 9.79086 10.7909 8 13 8H127C129.209 8 131 9.79086 131 12V28H9V12Z" />
      <path fill={body} d="M21 40C21 33.9249 25.9249 29 32 29H108C114.075 29 119 33.9249 119 40C119 46.0751 114.075 51 108 51H32C25.9249 51 21 46.0751 21 40Z" />
      <path fill={holes} d="M49 40.5C49 44.6421 45.6421 48 41.5 48C37.3579 48 34 44.6421 34 40.5C34 36.3579 37.3579 33 41.5 33C45.6421 33 49 36.3579 49 40.5Z" />
      <path fill={holes} d="M107 40.5C107 44.6421 103.642 48 99.5 48C95.3579 48 92 44.6421 92 40.5C92 36.3579 95.3579 33 99.5 33C103.642 33 107 36.3579 107 40.5Z" />
    </svg>
  )
}
