import React, { FC } from 'react'

type HeaderProps = {
    renderRight: boolean;
}

const Header: FC<HeaderProps> = ({renderRight}) => {
  return (
    <div className={`w-full h-fit p-4 bg-gradient-to-r from-black to-[#040e19] ${renderRight ? "flex justify-between items-center" : ""}`}>
        <img src="./logo.png" alt="Logo" className="h-8"/>
        {renderRight && <span className="h-full p-2 rounded-lg cursor-pointer hover:bg-slate-800">
            <p>Username</p>
            </span>}
    </div>
  )
}

export default Header