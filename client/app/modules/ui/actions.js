import types from './types';

export const updateWindowData = (data) => ({
	type: types.UPDATE_WINDOW_DATA,
	data
});

export const markLoaderComplete = () => ({
  type: types.LOADER_COMPLETE
});

export const toggleModal = (toggled, category, effect) => ({
  type: types.TOGGLE_MODAL,
  toggled,
  category,
  effect
});
