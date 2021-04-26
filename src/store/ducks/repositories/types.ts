export enum RepositorysTypes{
    LOAD_REQUEST = '@repositories/LOAD_REQUEST',
    LOAD_SUCCCES = '@repositories/LOAD_SUCCCES',
    LOAD_FAILURE = '@repositories/LOAD_FAILURE'
}

export interface Repository {
    iD: number;
    nome: string;
}

export interface RepositoriesState {
   readonly data: Repository[] 
   readonly loading: boolean
   readonly error: boolean
}