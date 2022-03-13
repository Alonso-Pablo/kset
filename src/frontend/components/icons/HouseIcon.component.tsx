interface HouseIconProps {
  fillIcon?: boolean;
}

export default function HouseIcon({ fillIcon }: HouseIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="30" viewBox="0 0 27 30" fill="none">
      { 
        fillIcon
          ? <path fill="#F2EAD7" xmlns="http://www.w3.org/2000/svg" d="M2.02386 7.50092C0.750816 8.44392 0 9.93444 0 11.5187V25.0001C0 27.7615 2.23858 30.0001 5 30.0001H22C24.7614 30.0001 27 27.7615 27 25.0001V11.5187C27 9.93444 26.2492 8.44392 24.9761 7.50092L16.4761 1.20462C14.7082 -0.104993 12.2918 -0.104992 10.5239 1.20463L2.02386 7.50092Z" />
          : <path fill="#F2EAD7" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M0 11.5187C0 9.93444 0.750816 8.44392 2.02386 7.50092L10.5239 1.20463C12.2918 -0.104992 14.7082 -0.104993 16.4761 1.20462L24.9761 7.50092C26.2492 8.44392 27 9.93444 27 11.5187V25.0001C27 27.7615 24.7614 30.0001 22 30.0001H5C2.23858 30.0001 0 27.7615 0 25.0001V11.5187ZM15.2804 4.31281C14.2218 3.53229 12.7782 3.53229 11.7196 4.31281L4.21964 9.84277C3.6861 10.2362 3.30463 10.7896 3.12187 11.4109C3.04192 11.6826 3 11.9674 3 12.2574C3 12.2574 3 12.2574 3 12.2574V24.0001C3 24 3 24.0001 3 24.0001C3.00001 24.5178 3.13117 25.005 3.36208 25.4301C3.8701 26.3652 4.86091 27.0001 6 27.0001H21C22.0388 27.0001 22.9543 26.4721 23.4927 25.6699C23.7057 25.3525 23.8598 24.9922 23.9391 24.6047C23.979 24.4094 24 24.2072 24 24.0001V12.2574C24 12.2574 24 12.2574 24 12.2574C24 11.6618 23.8232 11.0884 23.5033 10.604C23.3114 10.3134 23.068 10.0548 22.7804 9.84277L15.2804 4.31281Z" />
      }
    </svg>
  )
}