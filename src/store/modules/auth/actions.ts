import { action } from "typesafe-actions";

import { userLogin, AuthTypes } from './types'

export const singInRequest = (data: userLogin) => action(AuthTypes.LOAD_REQUEST,data)

export const singInSuccess = ({ token } : {token: string}) => action(AuthTypes.LOAD_SUCCCES, token)

export const singInFailure = ( {errorMessage} : {errorMessage: string} ) => action(AuthTypes.LOAD_FAILURE, errorMessage)

export const singInValidate =  ( token: string) => action(AuthTypes.LOAD_VALIDATE, data);