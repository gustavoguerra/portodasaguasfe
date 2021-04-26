// Essa parte combina todos os reducers da aplicação em um unico local

import { combineReducers } from 'redux';

import repositorys from './repositories/index'

export default combineReducers({
    repositorys,
});