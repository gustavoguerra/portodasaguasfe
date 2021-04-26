import { combineReducers } from 'redux'
import { StoreState } from '../createStore'

import authReducer from './auth/reducer'

export default combineReducers<StoreState>({
     auth: authReducer,
})
