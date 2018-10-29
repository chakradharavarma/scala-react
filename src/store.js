import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import promise from 'redux-promise-middleware';
import { createBrowserHistory } from 'history'
import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const history = createBrowserHistory()

const middleware = applyMiddleware(routerMiddleware(history), promise(), sagaMiddleware);

const rootReducer = connectRouter(history)(reducers)

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), middleware);

sagaMiddleware.run(rootSaga)

export default store;