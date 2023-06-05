import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { UserDetails } from "../../types";
import axios from "axios";

interface StateProps {
    auth: UserDetails;
}

type AddFileProps = {
    userDetails?: UserDetails;
    isUploading: boolean;
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddFile: FC<AddFileProps> = ({ userDetails, isUploading, setIsUploading }) => {
    const [title, setTitle] = useState("");
    const [_zip, setZip] = useState(null);
    const [accessCode, setAccessCode] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleAccessCodeChange = (e) => {
        setAccessCode(e.target.value);
    };

    const handleFileChoosing = (e) => {
        // const reader = new FileReader();
        // reader.addEventListener("load", async () => {
        //   const uploaded_zip = reader.result;
        //   setZip(uploaded_zip);
        // });
        // reader.readAsArrayBuffer(e.target.files[0]);
        setZip(e.target.files[0]);
    };
    const handleUpload = async () => {
        try {
            setIsUploading(true);
            const body = {
                file: _zip,
                name: title,
                password: accessCode,
            };
            const bodyFormData = new FormData();
            bodyFormData.append("file", _zip);
            bodyFormData.append("password", body.password);
            bodyFormData.append("name", body.name);
            const response = await axios.post(
                "http://localhost:9000/secureVideoFile/uploadAndGetURL",
                bodyFormData,
                {
                    headers: {
                        Authorization: "Bearer " + userDetails?.token,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
            location.reload()
        } catch (error) {
            console.error(error);
        } finally {
            setIsUploading(false)
        }
    };

    return (
        <div>
            {isUploading ? <img src="./loading.gif" alt="loading" className="w-24" /> : <>
                <input
                    onChange={handleFileChoosing}
                    type="file"
                    name="image"
                    id="zipUpload"
                    accept="application/zip, application/x-zip-compressed"
                />
                <br />
                <input
                    type="text"
                    placeholder="title"
                    id="titleInput"
                    value={title}
                    onChange={handleTitleChange}
                />
                <br />
                <input
                    type="text"
                    placeholder="accessCode"
                    id="accessCodeInput"
                    value={accessCode}
                    onChange={handleAccessCodeChange}
                />
                <br />
                <button onClick={handleUpload}>Upload</button>
            </>}
        </div>
    );
};

const mapStoreStateToProps = ({ auth }): StateProps => {
    return {
        ...auth,
    };
};

export default connect(mapStoreStateToProps)(AddFile);