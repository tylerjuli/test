import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import store from './store/store'

import App from './App';

import './static/css/bootstrap.min.css'
import './static/css/style.css'

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)