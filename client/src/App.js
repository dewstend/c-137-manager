import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';

import Characters from './pages/Characters'

function App() {
  return (
    <React.Fragment>
    <Header>
      <Router>
        <Switch>
          <Route exact path='/' component={Characters} />
          <Route path='/personajes' component={Characters} />
        </Switch>
      </Router>
    </Header>
    </React.Fragment>
  );
}

export default App;
