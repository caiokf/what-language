import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import MainLayout from './layouts/main.layout';
import NotFound from './pages/not-found';
import Home from './pages/home';
import Error from './pages/error';

import store from './store';

const history = syncHistoryWithStore(browserHistory, store);

export default (
  <Provider store={store}>
    <Router history={history}>

      <Route component={MainLayout}>
        <Route path="/" component={Home} />
      </Route>

      <Route component={MainLayout}>
        <Route path="/error" component={Error} />
      </Route>

      <Route component={MainLayout}>
        <Route path="*" component={NotFound} />
      </Route>

    </Router>
  </Provider>
);
