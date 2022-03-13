import { ReactElement } from "react";

interface FrameProps {
  children: ReactElement[] | ReactElement;
}

export default function Frame({ children }: FrameProps) {
  return (
    <div className="frame">
      { children }
    </div> 
  )
}
