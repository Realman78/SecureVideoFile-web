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

const App: FC<PropsFromRedux> = ({ setUserDetails, getAllFiles }) => {
  const [addPostShowing, setAddPostShowing] = useState(false)
  const [isUploading, setIsUploading] = useState(false);

  const toggleAddPostShowing = () => {
    setAddPostShowing(!addPostShowing)
  }


  useEffect(() => {
    const userDetails = localStorage.getItem('user')
    if (!userDetails) {
      logout()
    } else {
      setUserDetails(JSON.parse(userDetails))
      getAllFiles()
    }
  }, [])

  return (
    <div className="flex flex-col w-full h-full relative">
      <Header renderRight />
      <Modal handleClose={isUploading ? () => {} : toggleAddPostShowing} show={addPostShowing}>
        <AddFile isUploading={isUploading} setIsUploading={setIsUploading} />
      </Modal>
      <CenterWrapper>
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-4/5 h-4/5">
            <div className="flex justify-between items-center mb-20">
              <p className="font-bold text-4xl">User File List</p>
              <span className="cursor-pointer" onClick={toggleAddPostShowing}>
                <UploadIcon />
              </span>
            </div>
            <FileList />
          </div>
        </div>
      </CenterWrapper>
    </div>

  );
}


const mapActionsToProps = (dispatch: any) => {
  return {
    ...getAuthActions(dispatch),
    ...getPostActions(dispatch)
  }
}
const connector = connect(null, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
