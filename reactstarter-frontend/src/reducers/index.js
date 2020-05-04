import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender'
import auth from './Auth'

const reducers = combineReducers({
    state: auth,
    pender: penderReducer
})

export default reducers