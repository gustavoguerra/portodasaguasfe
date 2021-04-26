import { AuthAction, AuthState, AuthTypes } from "./types"

const initialState: AuthState = {
    loadingSingInRequest: false,
    isSingnedIn: false,
    error: false,
    errorMessage: null,
    token: null   
}

export default function auth(state = initialState, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthTypes.LOAD_REQUEST:
            return {
                ...state,
                loadingSingInRequest: true,
                error: false,
                errorMessage: '',
                token: '' 
            }
        case AuthTypes.LOAD_SUCCCES:
            return {
                ...state,
                loadingSingInRequest: false,
                isSingnedIn: true,  
                token: action.payload             
            }
        case AuthTypes.LOAD_FAILURE:
            return {
                ...state,
                loadingSingInRequest: false,
                isSingnedIn: false, 
                error: true,
                errorMessage: action.payload,
                token: ''
            }
        default:
            return {
                ...state
            }
    }
}