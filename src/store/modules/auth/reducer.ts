import { AuthAction, AuthState, AuthTypes } from "./types"

const initialState: AuthState = {
    loadingSingInRequest: false,
    isSingnedIn: false,
    error: false,
    errorMessage: null 
}

export default function auth(state = initialState, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthTypes.LOAD_REQUEST:
            return {
                ...state,
                loadingSingInRequest: true,
                error: false,
                errorMessage: ''
            }
        case AuthTypes.LOAD_SUCCCES:
            return {
                ...state,
                loadingSingInRequest: false,
                isSingnedIn: true           
            }
        case AuthTypes.LOAD_FAILURE:
            return {
                ...state,
                loadingSingInRequest: false,
                isSingnedIn: false, 
                error: true,
                errorMessage: action.payload,
            }
        case AuthTypes.LOAD_VALIDATE:
            return {
                ...state,
                loadingSingInRequest: true,
                error: false,
                errorMessage: ''
            }
        default:
            return {
                ...state
            }
    }
}