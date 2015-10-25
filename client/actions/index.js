export const ADD_LAYER = 'ADD_LAYER';
export const SHOW_LAYER = 'SHOW_LAYER';
export const HIDE_LAYER = 'HIDE_LAYER';
export const TOGGLE_LAYER = 'TOGGLE_LAYER';

export const addLayer = (name) => {
  return { type: ADD_LAYER, name };
};

export const showLayer = (name) => {
  return { type: SHOW_LAYER, name };
};

export const hideLayer = (name) => {
  return { type: HIDE_LAYER, name };
};

export const toggleLayer = (name) => {
  return { type: TOGGLE_LAYER, name };
};
