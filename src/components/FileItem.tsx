import { FC, useState } from 'react'
import FileIcon from '../assets/FileIcon';
import DownloadIcon from '../assets/DownloadIcon';
import { formatBytes, logout } from '../utils/utils';
import Modal from './UI/Modal';
import { toast } from 'react-toastify';

type FileItemProps = {
    _file: any;
}

const FileItem: FC<FileItemProps> = ({ _file }) => {
    const [addPostShowing, setAddPostShowing] = useState(false)
    const [pass, setPass] = useState("")

    const passwordChangeHandler = (e) => {
        setPass(e.target.value)
    }

    const toggleAddPostShowing = () => {
        if (addPostShowing) {
            setPass("")
        }
        setAddPostShowing(!addPostShowing)
    }
    return (
        <div className="bg-[#041B37] mb-6 flex justify-between items-center py-4 px-5 rounded-lg relative">
            <Modal handleClose={toggleAddPostShowing} show={addPostShowing}>
                <p>ok</p>
                <input type="text" value={pass} onChange={passwordChangeHandler} />
                <button onClick={() => {
                    const fd = new FormData()
                    const url = 'http://localhost:9000/secureVideoFile/retrieveUsingURL';
                    const password = pass;
                    const fileUrl = _file.url;
                    fd.append("password", password)
                    fd.append("URL", fileUrl)
                    fd.append("name", "ok")

                    const userDetails = localStorage.getItem('user')
                    let authToken = ""

                    if (userDetails) {
                        const token = JSON.parse(userDetails).token
                        authToken = "Bearer " + token
                    } else {
                        toast.error("user not logged in.");
                        logout()
                        return
                    }

                    fetch(url, {
                        headers: {
                            'Authorization': `Bearer ${authToken}`
                        },
                        body: fd,
                        method: "POST"
                    })
                        .then(response => {
                            if (response.status === 200) {
                                // Extract the filename from the response headers
                                console.log(response)
                                const contentDisposition = response.headers.get('content-disposition');
                                console.log(contentDisposition)
                                const filename = _file.name+".zip"

                                // Consume the response as a ReadableStream and create a Blob
                                return response.blob().then(blob => {
                                    // Create a download link element
                                    const downloadLink = document.createElement('a');
                                    downloadLink.href = URL.createObjectURL(blob);
                                    downloadLink.download = filename;
                                    downloadLink.click();
                                });
                            } else if (response.status === 401) {
                                // Handle unauthorized access
                                console.log('Unauthorized access');
                            } else {
                                // Handle other error scenarios
                                console.log('Error');
                            }
                        })
                        .catch(error => {
                            console.log('Request failed', error);
                        });
                }}>Download</button>
            </Modal>
            <div className="flex w-1/4">
                <FileIcon />
                <p className="ml-3 text-white">{_file.name}</p>
            </div>
            <span className="h-4 w-[2px] border-l border-white"></span>
            <div className="flex w-1/4 justify-center">
                <p className="text-white">{new Date(_file.createdAt).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                })}</p>
            </div>
            <span className="h-4 w-[2px] border-l border-white"></span>
            <div className="flex justify-center w-1/4 text-center">
                <p className="text-white">{formatBytes(Math.floor(Math.random() * (25000000 - 1500000 + 1)) + 1500000)}</p>
            </div>
            <span onClick={toggleAddPostShowing} className="cursor-pointer absolute right-3">
                <DownloadIcon />
            </span>
        </div>
    )
}

export default FileItem