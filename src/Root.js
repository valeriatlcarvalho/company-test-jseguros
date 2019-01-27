import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import App from './containers/App';
import Search from './containers/Search';

const Root = () => (
  <Router>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/search" component={Search} />
    </Switch>
  </Router>
)

export default Root