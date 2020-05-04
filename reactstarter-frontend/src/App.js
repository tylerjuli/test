import React, {Component} from 'react';
import * as actions from './reducers/Auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Header from './components/pages/Header'
import Footer from './components/pages/Footer'
import Admin from './components/pages/Admin'
import Home from './components/pages/Home'
import Signin from './components/pages/Signin'
import Signup from './components/pages/Signup'
import PrivateRoute from './components/atoms/PrivateRoute'

class App extends Component {

  render(){
    const { isLogin } = this.props.auth;
    return (
      <div className="App">
        <Router>
          <Header authActions={this.props.AuthActions} isLogin={this.props.auth.isLogin}/>
          <Switch>
            <PrivateRoute isLogin={isLogin} exact path="/" component={Home} />
            <Route exec path="/signin">
              {
                !!isLogin&&
                <Redirect push to="/" />
              }
              <Signin />
            </Route>
            <Route path="/signup">
              {
                !!isLogin&&
                <Redirect push to="/" />
              }
              <Signup />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="*">
              <Signin />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

const mapStateToComponent = ({ state }) => ({
  auth: state
})

const mapDispatchToProps = (dispatch) => ({
  AuthActions: bindActionCreators(actions, dispatch),
})

export default connect( mapStateToComponent,mapDispatchToProps )(App)
