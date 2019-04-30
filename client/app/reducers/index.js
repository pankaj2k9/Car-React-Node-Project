import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { assign } from 'lodash';
import * as app from '../modules';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers(
  assign({ routing }, app)
);

export default rootReducer;
