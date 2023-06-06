import { NavigateFunction } from 'react-router-dom'
import * as api from '../../api'
import { UserDetails } from '../../types'


export const authActions = {
    SET_USER_DETAILS: 'AUTH.SET_USER_DETAILS'
}

export const getAuthActions = (dispatch: any) => {
    return {
        login: (userDetails: { mail: string, password: string }, navigate: any) => dispatch(login(userDetails, navigate)),
        register: (userDetails: { mail: string, password: string, username: string }, navigate: any) => dispatch(register(userDetails, navigate)),
        setUserDetails: (userDetails: UserDetails) => dispatch(setUserDetails(userDetails))
    }
}

export const setUserDetails = (userDetails: UserDetails) => {
    return {
        type: authActions.SET_USER_DETAILS,
        userDetails
    }
}

const login = (userDetails: { mail: string, password: string}, navigate: NavigateFunction) => {
    return async (dispatch: any) => {
        const response = await api.login(userDetails)
        console.log(response)
        if (response?.error) {
            return { error: response.exception }
        } else {
            const { userDetails } = response.data
            localStorage.setItem('user', JSON.stringify(userDetails))

            dispatch(setUserDetails(userDetails))
            navigate('/')
            return {}
        }
    }
}

const register = (userDetails: { mail: string, password: string, username: string }, navigate: NavigateFunction) => {
    return async (dispatch: any) => {
        const response = await api.register(userDetails)
        console.log(response)
        if (response?.error) {
            return { error: response.exception }
        } else {
            const { userDetails } = response.data
            localStorage.setItem('user', JSON.stringify(userDetails))

            dispatch(setUserDetails(userDetails))
            navigate('/')
            return {}
        }
    }
}