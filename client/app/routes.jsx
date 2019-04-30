import React from 'react';
import { Route, IndexRoute } from 'react-router';


import Region from 'containers/Region';
import Home from 'containers/Home';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (
  <Route path="/adventurerx">
    <IndexRoute component={Home} />
    <Route path="/adventurerx/:region" component={Region} />
  </Route>
 );
