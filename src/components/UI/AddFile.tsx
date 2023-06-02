import React, { FC, useState } from 'react'
import { connect } from 'react-redux'
import { UserDetails } from '../../types';

interface StateProps {
    auth: UserDetails;
}

type AddFileProps = {
    userDetails?: UserDetails;
    toggleAddPostShowing: any;
}

const AddFile: FC<AddFileProps> = ({ userDetails, toggleAddPostShowing }) => {
    const [title, setTitle] = useState('')
    const [_zip, setZip] = useState(null)
    const [accessCode, setAccessCode] = useState('')

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleAccessCodeChange = (e) => {
        setAccessCode(e.target.value)
    }

    const handleFileChoosing = e => {
        const reader = new FileReader();
        reader.addEventListener("load", async () => {
            const uploaded_zip = reader.result;
            setZip(uploaded_zip)
        });
        reader.readAsDataURL(e.target.files[0]);
    }
    const handleUpload = async () => {
        const body = {
            file: _zip,
            name: title,
            password: accessCode,
            user_details: userDetails
        }

        console.log(body)
    }

    return <div>
        <input onChange={handleFileChoosing} type="file" name="image" id="zipUpload" accept="application/zip, application/x-zip-compressed" />
        <input type="text" placeholder='title' id='titleInput' value={title} onChange={handleTitleChange} />
        <input type="text" placeholder='accessCode' id='accessCodeInput' value={accessCode} onChange={handleAccessCodeChange} />
        <button onClick={handleUpload}>Upload</button>
    </div>
}

const mapStoreStateToProps = ({ auth }): StateProps => {
    return {
        ...auth,
    };
};

export default connect(mapStoreStateToProps)(AddFile);