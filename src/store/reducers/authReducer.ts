import { UserDetails } from "../../types"
import { authActions } from "../actions/authActions"

const initialState: {
    userDetails: UserDetails | null
} = {
    userDetails: null
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case authActions.SET_USER_DETAILS:
            return {
                ...state,
                userDetails: action.userDetails
            }
        default:
            return state
    }
}

export default reducer