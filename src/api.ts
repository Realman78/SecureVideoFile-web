import axios from 'axios'
import { logout } from './utils/utils'
import { UserDetails } from './types'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000
})

apiClient.interceptors.request.use(config => {
    const userDetails = localStorage.getItem('user')

    if (userDetails) {
        const token = JSON.parse(userDetails).token
        config.headers.authorization = "Bearer " + token
    }

    return config
}, err => {
    return Promise.reject(err)
})

export const login = async (data: {mail: string, password: string}) => {
    try {
        return await apiClient.post('/api/auth/login', data)
    } catch (exception) {
        return {
            error: true,
            exception
        }
    }
}
export const register = async (data: {mail: string, password: string, username: string}) => {
    try {
        return await apiClient.post('/api/auth/register', data)
    } catch (exception) {
        return {
            error: true,
            exception
        }
    }
}

export const getAllFiles = async ()=>{
    try {
        return await apiClient.get('/api/file/fetch/all')
    } catch (exception) {
        return {
            error: true,
            exception
        }
    }
}