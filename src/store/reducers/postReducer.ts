import { UserPost } from "../../types"
import { postActions } from "../actions/postActions"

const initialState: {
    posts: UserPost[]
} = {
    posts: []
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case postActions.SET_USER_POSTS:
            return {
                ...state,
                posts: action.posts
            }
        default:
            return state
    }
}

export default reducer