import React, { FC } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserDetails } from '../types';

interface StateProps {
  userDetails: UserDetails;
}

type HeaderProps = {
  renderRight: boolean;
  renderBackToDashboard?: boolean;
  userDetails?: UserDetails;
}

const Header: FC<HeaderProps> = ({ renderRight, renderBackToDashboard = false, userDetails }) => {
  const navigate = useNavigate()
  return (
    <div className={`w-full h-fit p-4 bg-gradient-to-r from-black to-[#040e19] ${renderRight ? "flex justify-between items-center" : ""}`}>
      {renderBackToDashboard ? <span className="cursor-pointer" onClick={() => {
        navigate("/")
      }}>⬅ Dashboard</span> : <img src="./logo.png" alt="Logo" className="h-8" />}
      {renderRight && <span onClick={() => {
        if (userDetails?.status === "Active")
          navigate("/settings")
        else
          navigate("/login")
      }} className="h-full p-2 rounded-lg cursor-pointer hover:bg-slate-800">
        <p>{userDetails?.status === "Active" ? userDetails?.username ?? "Loading..." : "Log out"}</p>
      </span>}
    </div>
  )
}

const mapStoreStateToProps = ({ auth }): StateProps => {
  return {
    ...auth
  }
}
const connector = connect(mapStoreStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Header);
