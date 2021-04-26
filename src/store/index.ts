import { Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import createStore from './createStore';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSagas'

const salgaMiddlaware = createSagaMiddleware();

const middlawares: Middleware[] = [salgaMiddlaware];

const store = createStore(rootReducer, middlawares);

salgaMiddlaware.run(rootSaga);

export { store };