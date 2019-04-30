import { combineReducers } from 'redux';
import types from './types';
import { assign } from 'lodash';

import { landingPageMinHeight, landingPagePos } from 'utilities/constants';

const initialState = {
  width: '',
};

const windowData = (
  state = initialState,
  action
) => {
  const { error, result } = action;
  switch (action.type) {
    case types.UPDATE_WINDOW_DATA:
      return assign({}, state, {
        width: action.data.width,
        height: action.data.height,
        outerWidth: action.data.outerWidth,
        outerheight: action.data.outerHeight
      });
    default: return state;
  }
};

const isDesktop = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.UPDATE_WINDOW_DATA:
      return action.data.width >= 1025;
    default: return state;
  }
};

const isTablet = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.UPDATE_WINDOW_DATA:
      return action.data.width >= 768 && action.data.width < 1025;
    default: return state;
  }
};

const isMobile = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.UPDATE_WINDOW_DATA:
      return action.data.width < 768;
    default: return state;
  }
};

const loaderComplete = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.LOADER_COMPLETE:
      return true;
    default: return state;
  }
};

const modal = (
  state = {toggled: false, effect: {}},
  action,
) => {
  const { toggled, effect } = action;
  switch (action.type) {
    case types.TOGGLE_MODAL:
      return {toggled, effect};
    default: return state;
  }
}

export const reducer = combineReducers({
  windowData,
  isDesktop,
  isMobile,
  isTablet,
  loaderComplete,
  modal
});
