import { combineReducers } from 'redux';
import types from './types';
import { assign } from 'lodash';

const initialState = {
  data: {}
};

const data = (
  state = initialState,
  action
) => {
  const { error, result } = action;
  switch (action.type) {
    case types.GET_REGION_DATA_SUCCESS:
      return assign({}, result.data);
    case types.GET_REGION_DATA_FAILURE:
      return assign({}, state, {fetching: true, error});
    default:
      return state;
  }
};

export const reducer = combineReducers({
  data
});
