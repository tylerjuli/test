import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserLoader from './UserLoader'

const PrivateRoute = ({ isLogin, component: Component, ...rest }) => (
    <React.Fragment>
        <UserLoader/>
        <Route {...rest} render={props => (
            !!isLogin
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        )} />
    </React.Fragment>
)

export default PrivateRoute