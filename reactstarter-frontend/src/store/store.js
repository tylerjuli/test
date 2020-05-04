import reducers from '../reducers'
import { compose, createStore, applyMiddleware  } from 'redux';
import penderMiddleware from 'redux-pender';
const devTools = () => window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(
    reducers,
    compose(applyMiddleware(penderMiddleware()), devTools()),
)

export default store;