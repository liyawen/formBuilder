import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  hashHistory,
} from 'react-router';

import Application from '../application';
import home from '../view/home/app';
import designForm from '../view/formBuild/app';
import showForm from '../view/showForm/app';

class Routes extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Application}>
          <IndexRoute component={home} />
          <Route path="/designForm" component={designForm} />
          <Route path="/showForm" component={showForm} />
        </Route>
      </Router>
    );
  }
}

export default Routes;