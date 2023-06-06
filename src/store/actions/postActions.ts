import { UserPost } from "../../types"
import * as api from '../../api'

export const postActions = {
    SET_USER_POSTS: 'POST.SET_USER_POSTS'
}

export const getPostActions = (dispatch: any) => {
    return {
        setUserPosts: (posts: UserPost[]) => dispatch(setUserPosts(posts)),
        getAllFiles: () => dispatch(getAllFiles()),

    }
}

export const setUserPosts = (posts: UserPost[]) => {
    return {
        type: postActions.SET_USER_POSTS,
        posts
    }
}

export const getAllFiles = () => {
    return async (dispatch: any) => {
        const response = await api.getAllFiles()
        if (response.error) {
            return { error: response }
        } else {
            const posts = response.data
            console.log("POSTS", posts)
            dispatch(setUserPosts(posts.files.reverse()))
            return {}
        }
    }
}
