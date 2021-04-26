//Sao os reducers da aplicação

import { Reducer } from 'redux'
import { action } from 'typesafe-actions'
import { RepositoriesState, RepositorysTypes } from './types'

const INITIAL_STATE: RepositoriesState = {
    data: [],
    error: false,
    loading: false
}

const reducer: Reducer<RepositoriesState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RepositorysTypes.LOAD_REQUEST:
            return {
                ...state, loading: true
            }
        case RepositorysTypes.LOAD_SUCCCES:
            return {
                ...state, loading: false, error: false, data: action.payload.data
            }
        case RepositorysTypes.LOAD_FAILURE:
            return {
                ...state, loading: false, error: true, data: []
            }

        default:
            return state;
    }
}

export default reducer;