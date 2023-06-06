import React, { FC, useEffect, useState } from 'react'
import Header from '../components/Header'
import CenterWrapper from '../components/UI/CenterWrapper'
import { logout } from '../utils/utils'
import { connect, ConnectedProps } from 'react-redux'
import { getAuthActions } from '../store/actions/authActions'
import { getPostActions } from '../store/actions/postActions'
import { UserDetails } from '../types'
import { useNavigate } from 'react-router-dom'
import { deleteAccountAndFiles } from '../api'
import { toast } from 'react-toastify'

interface StateProps {
    auth: UserDetails;
}
type AddFileProps = {
    userDetails?: UserDetails;
} & PropsFromRedux;

const Settings: FC<AddFileProps> = ({ userDetails, setUserDetails }) => {
    const navigate = useNavigate()

    const [isPendingDeletion, setIsPendingDeletion] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [counter, setCounter] = useState(10)

    useEffect(() => {
        const userDetails = localStorage.getItem('user')
        if (!userDetails) {
            logout()
        } else {
            const user: UserDetails = JSON.parse(userDetails)
            setUserDetails(user)
            if (user.status === "Pending") {
                navigate("/")
                return;
            }
        }
    }, [])

    useEffect(() => {
        let interval = null
        if (isDeleting) return;
        if (isPendingDeletion) {
            interval = setInterval(async () => {
                setCounter(p => {
                    if (isDeleting) return p;
                    if (p === 0) {
                        setIsDeleting(true)
                        deleteAccountAndFiles().then(res => {
                            if (res.error) {
                                // toast.error("Something went wrong.")
                                navigate("/")
                                return;
                            }
                            toast.info("Account deleted.")
                            navigate("/register")
                            setIsDeleting(false)
                            return;
                        }).catch(e => {
                            // toast.error("Something went wrong.")
                        })
                    }
                    return p - 1;
                })
            }, 1000)
        }
        return () => {
            if (interval)
                clearInterval(interval)
        }
    }, [isPendingDeletion, isDeleting])

    return <div className="flex flex-col w-full h-full relative">
        <Header renderRight={false} renderBackToDashboard />
        <CenterWrapper>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <h2 className="mb-8 text-2xl uppercase font-bold">Settings</h2>
                <div className="flex flex-col h-1/4 w-full justify-between items-center">
                    {!isPendingDeletion && !isDeleting && <><p className="text-lg uppercase font-bold">{userDetails?.username}</p>
                        <button onClick={logout}>Logout</button>
                        <button className="bg-red-800" onClick={async () => {
                            const answer = prompt("Do you want to delete your account? (y/n)")
                            if (answer?.toLowerCase().startsWith("y")) {
                                setIsPendingDeletion(true);
                            }
                        }}>Delete my account and all files associated with it.</button></>}

                    {isPendingDeletion && !isDeleting && <>
                        <h2>Your account, by the username {userDetails?.username}, will be deleted in</h2>
                        <h1>{counter}</h1>
                        <button className="bg-green-500" onClick={() => {
                            setIsDeleting(false);
                            setIsPendingDeletion(false);
                            setCounter(10);
                        }}>CLICK TO CANCEL DELETION</button>
                    </>}
                    {isDeleting && <p>Goodbye...</p>}
                </div>
            </div>
        </CenterWrapper>
    </div>
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

export default connector(Settings);