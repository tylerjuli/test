import * as types from '../actions/ActionTypes';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as API from '../lib/api';
import * as storage from '../lib/storage';

const initialState = {
    isAlert: false,
    alert: '',
    alertStatus:'',
    isLogin: false,
    userInfo: {}
}

// export const getMachines = createAction( types.GET_MACHINES, API.getMachines )
// export const putMachineName = createAction( types.PUT_MACHINE_NAME, API.putMachineName )
export const setError = createAction( types.SET_ERROR, (data) => ({data}))
export const initialize = createAction( types.INITIALIZE)
export const userRegister = createAction( types.USER_REGISTER, API.userRegister )
export const userLogin = createAction( types.USER_LOGIN, API.userLogin )
export const setUser = createAction( types.SET_USER, (data) => ({data}) )
export const checkLoginStatus = createAction( types.CHECK_LOGIN_STATUS, API.checkLoginStatus )
export const userLogout = createAction( types.USER_LOGOUT, storage.remove )


export default handleActions({
    ...pender({
        type: types.CHECK_LOGIN_STATUS,
        onSuccess: (state, action) => ({
            ...state,
            isLogin: true,
            userInfo: action.payload.data.user
        }),
        onFailure: (state, action) => ({
            ...state,
            isLogin: false,
            userInfo: {}
        })
    }),
    ...pender({
        type: types.USER_LOGIN,
        onSuccess: (state, action) => {
            storage.set(action.payload.data)
            return ({
                ...state,
                isAlert: true,
                alert: 'Login success!',
                alertStatus:'alert-success',
                isLogin: true,
                userInfo: action.payload.data
            })
        },
        onFailure: (state, actions) => ({
            ...state,
            isAlert: true,
            alert: actions.payload.response,
            alertStatus:'alert-danger'
        })
    }),
    ...pender({
        type: types.USER_REGISTER,
        onSuccess: (state, action) => ({
            ...state,
            isAlert: true,
            alert: 'Register success. Please login!',
            alertStatus:'alert-success'
        }),
        onFailure: (state, actions) => ({
            ...state,
            isAlert: true,
            alert: actions.payload.response.data.message,
            alertStatus:'alert-danger'
        })
    }),
    [types.USER_LOGOUT]: (state, action) => ({
        ...state,
        isLogin: false,
    }),
    [types.SET_ERROR]: (state, action) => ({
        ...state,
        isAlert: true,
        alert: action.payload.data,
        alertStatus: 'alert-danger'
    }),
    [types.INITIALIZE]: (state, action) => ({
        ...state,
        isAlert: false,
        alert: '',
        alertStatus: ''
    }),
    [types.SET_USER]: (state, action) =>{
     return ({
        ...state,
        isLogin: true,
        userInfo: action.payload.data
    })}
}, initialState)