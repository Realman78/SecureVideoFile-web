import React, { FC, ReactElement } from 'react'

type CenterWrapperProps = {
    children: JSX.Element
}

const CenterWrapper: FC<CenterWrapperProps> = ({children}) => {
  return (
    <div className="flex justify-center content-center w-full h-full">
        {children}
    </div>
  )
}

export default CenterWrapper