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
        } catch (error) {
            console.error(error);
        } finally {
            setIsUploading(false)
            location.reload()
        }
    };

    return (
        <div className="text-center w-full h-full flex flex-col justify-evenly items-center">
            <h2 className="mb-4 text-2xl uppercase font-bold">Upload{isUploading ? "ing..." : " a file"}</h2>
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
                    className="text-white rounded w-full py-2 px-3 leading-tight focus:outline-none"
                />
                <br />
                <input
                    type="text"
                    placeholder="accessCode"
                    id="accessCodeInput"
                    value={accessCode}
                    onChange={handleAccessCodeChange}
                    className="text-white rounded w-full py-2 px-3 leading-tight focus:outline-none"
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