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

// export const getAllPosts = async ()=>{
//     try {
//         return await apiClient.get('/api/posts/getall')
//     } catch (exception) {
//         return {
//             error: true,
//             exception
//         }
//     }
// }

// export const getSearchTermPosts = async (searchTerm)=>{
//     try {
//         return await apiClient.get('/api/posts/search?search='+searchTerm)
//     } catch (exception) {
//         return {
//             error: true,
//             exception
//         }
//     }
// }
// export const getPost = async (id)=>{
//     try {
//         return await apiClient.get('/api/comments/get/'+id)
//     } catch (exception) {
//         return {
//             error: true,
//             exception
//         }
//     }
// }
// export const addPost = async (data)=>{
//     try {
//         return await apiClient.post('/api/posts/create', data)
//     } catch (exception) {
//         return {
//             error: true,
//             exception
//         }
//     }
// }
// export const addPostComment = async (data)=>{
//     try {
//         return await apiClient.post('/api/comments/create', data)
//     } catch (exception) {
//         return {
//             error: true,
//             exception
//         }
//     }
// }
// export const editPostComment = async (data)=>{
//     try {
//         return await apiClient.patch('/api/comments/update/'+data.id, data)
//     } catch (exception) {
//         return {
//             error: true,
//             exception
//         }
//     }
// }
// export const deleteComment = async (data)=>{
//     try {
//         return await apiClient.post('/api/comments/delete/'+data.id, data)
//     } catch (exception) {
//         return {
//             error: true,
//             exception
//         }
//     }
// }
// export const likePost = async (data)=>{
//     try {
//         return await apiClient.patch('/api/posts/like/'+data.id, data)
//     } catch (exception) {
//         return {
//             error: true,
//             exception
//         }
//     }
// }