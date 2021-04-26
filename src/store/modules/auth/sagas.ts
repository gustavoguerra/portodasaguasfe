import { ActionType } from 'typesafe-actions'
import { takeLatest, call, put, all } from 'redux-saga/effects'
import * as actions from './actions'
import api from '../../../Services/api'

export function* singIn( { payload } :  ActionType<typeof actions.singInRequest>) {
    try {
        const { username, password, systemId } = payload;
        const { data } = yield call(api.login.post, '/Auth', {
            username, password , systemId           
        });     

        yield put(actions.singInSuccess({ token : data}))
    }
    catch (error) {
        
        let message = error.response.data.message;

        yield put(actions.singInFailure({ errorMessage: message}))
    }
}

export default all([
    takeLatest('@auth/SING_IN_REQUEST',singIn)
])