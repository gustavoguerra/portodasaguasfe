import { ActionType } from 'typesafe-actions'
import { takeLatest, call, put, all } from 'redux-saga/effects'
import * as actions from './actions'
import api from '../../../Services/api'
import { AuthTypes } from './types'

export function* singIn( { payload } :  ActionType<typeof actions.singInRequest>) {
    try {
        const { username, password, systemId } = payload;
        const { data } = yield call(api.login.post, '/Auth', {
            username, password , systemId           
        });     
        localStorage.setItem('TOKEB',data.token)
        yield put(actions.singInSuccess({ token : data}))
    }
    catch (error) {
        
        let message = error.response.data.message;

        yield put(actions.singInFailure({ errorMessage: message}))
    }
}

export function* validateToken( { payload } : ActionType<typeof actions.singInRequest>){
    try{



    }
    catch (error) {

    }
}

export default all([
    takeLatest(AuthTypes.LOAD_REQUEST,singIn),
    takeLatest(AuthTypes.LOAD_VALIDATE,validateToken)
])