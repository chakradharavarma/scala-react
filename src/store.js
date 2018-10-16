import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import promise from 'redux-promise-middleware';
import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(promise(), sagaMiddleware);

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), middleware);

sagaMiddleware.run(rootSaga)

export default store;