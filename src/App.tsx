import Header from "./components/Header";
import CenterWrapper from "./components/UI/CenterWrapper";
import FileList from "./components/FileList";
import UploadIcon from "./assets/UploadIcon";
import { FC, useEffect, useState } from "react";
import { logout } from "./utils/utils";
import { getAuthActions } from "./store/actions/authActions";
import { ConnectedProps, connect } from "react-redux";
import Modal from "./components/UI/Modal";
import AddFile from "./components/UI/AddFile";
import { getPostActions } from "./store/actions/postActions";
import { UserDetails } from "./types";
import { resendConfirmationMail } from "./api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


interface StateProps {
  userDetails: UserDetails;
}

const App: FC<PropsFromRedux> = ({ setUserDetails, getAllFiles, userDetails }) => {
  const [addPostShowing, setAddPostShowing] = useState(false)
  const [isUploading, setIsUploading] = useState(false);
  const [isUserPending, setIsUserPending] = useState(false);
  const navigate = useNavigate()

  const toggleAddPostShowing = () => {
    setAddPostShowing(!addPostShowing)
  }


  useEffect(() => {
    const userDetails = localStorage.getItem('user')
    if (!userDetails) {
      logout()
    } else {
      const user: UserDetails = JSON.parse(userDetails)
      setUserDetails(user)
      if (user.status === "Pending") {
        setIsUserPending(true);
        return;
      }
      getAllFiles()
    }
  }, [])

  return (
    <div className="flex flex-col w-full h-full relative">
      <Header renderRight />
      <Modal handleClose={isUploading ? () => { } : toggleAddPostShowing} show={addPostShowing}>
        <AddFile isUploading={isUploading} setIsUploading={setIsUploading} />
      </Modal>
      <CenterWrapper>
        <div className="w-full h-full flex justify-center items-center">
          {isUserPending && localStorage.getItem('user') ? <div>
            Please confirm your account. If you havent received an email, we can <span onClick={async () => {
              const r = await resendConfirmationMail(userDetails._id)
              console.log(r)
              if (r.error) {
                toast.error("Something went wrong.")
              } else {
                toast.info("Confirmation sent. You will be logged out in 5 seconds...");
                setTimeout(() => {
                  logout()
                }, 5000)
              }
            }} className="underline text-blue-500 cursor-pointer">resend</span> it to you.
            <p>If you confirmed you account, but see this message. Please click <span className="underline text-blue-500 cursor-pointer" onClick={() => {
              navigate("/login")
            }}>here</span> and login</p>
          </div> : <div className="w-4/5 h-4/5">
            <div className="flex justify-between items-center mb-20">
              <p className="font-bold text-4xl">User File List</p>
              <span className="cursor-pointer" onClick={toggleAddPostShowing}>
                <UploadIcon />
              </span>
            </div>
            <FileList />
          </div>}
        </div>
      </CenterWrapper>
    </div>

  );
}

const mapStoreStateToProps = ({ auth }): StateProps => {
  return {
    ...auth
  }
}

const mapActionsToProps = (dispatch: any) => {
  return {
    ...getAuthActions(dispatch),
    ...getPostActions(dispatch)
  }
}
const connector = connect(mapStoreStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
