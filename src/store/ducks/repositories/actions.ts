import { action } from 'typesafe-actions'
import { RepositorysTypes, Repository } from './types'


export const loadRequest = () => action(RepositorysTypes.LOAD_REQUEST)

export const loadSuccess = (data: Repository[]) => action(RepositorysTypes.LOAD_SUCCCES, data)

export const loadFailure = () => action(RepositorysTypes.LOAD_FAILURE)