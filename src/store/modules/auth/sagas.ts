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

        localStorage.setItem('TOKEN',data)
        yield put(actions.singInSuccess())      
    }
    catch (error) {
        
        let message = error.response.data.message;

        yield put(actions.singInFailure({ errorMessage: message}))
    }
}

export function* validateToken(){
    try{
        const { data } = yield call(api.login.get, '/validatetoken/' + localStorage.getItem('TOKEN'));     
        
        if(data){
            yield put(actions.singInSuccess())
        }else{
            localStorage.setItem('TOKEN', "")
            yield put(actions.singInFailure({ errorMessage: ""}))
        }              
    }
    catch (error) {
        localStorage.setItem('TOKEN', "")
        yield put(actions.singInFailure({ errorMessage: ""}))
    }
}

export default all([
    takeLatest(AuthTypes.LOAD_REQUEST,singIn),
    takeLatest(AuthTypes.LOAD_VALIDATE,validateToken)
])