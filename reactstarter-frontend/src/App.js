import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Header from './components/pages/Header'
import Footer from './components/pages/Footer'
import Admin from './components/pages/Admin'
import Home from './components/pages/Home'
import Signin from './components/pages/Signin'
import Signup from './components/pages/Signup'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exec path="/signin">
            <Signin />
          </Route>
          <Route path="/signup">
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
export default App;
