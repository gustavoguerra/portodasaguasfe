import { ActionType } from 'typesafe-actions'
import * as actions from './actions';

export type AuthAction = ActionType<typeof actions>;

export interface userLogin {
    username: string,
    password:string,
    systemId: number
}

export enum AuthTypes{
    LOAD_REQUEST = '@auth/SING_IN_REQUEST',
    LOAD_SUCCCES = '@auth/SING_IN_SUCCESS',
    LOAD_FAILURE = '@auth/SING_IN_FAILURE',
    LOAD_VALIDATE = '@auth/SING_IN_VALIDATE'
}

export interface AuthState {
    readonly loadingSingInRequest: boolean;
    readonly isSingnedIn: boolean;
    readonly error: boolean;
    readonly errorMessage: string | null;
}