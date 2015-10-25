import {
  ADD_LAYER, SHOW_LAYER, HIDE_LAYER, TOGGLE_LAYER
}
from '../actions';

const initialState = [];

export default function layers(state = initialState, action) {
  switch (action.type) {

  case ADD_LAYER:
    return [...state, {
      name: action.name,
      visible: true
    }];

  case SHOW_LAYER:
    return state.map(layer =>
      layer.name === action.name ?
        Object.assign({}, layer, { visible: true }) :
        layer
    );

  case HIDE_LAYER:
    return state.map(layer =>
      layer.name === action.name ?
        Object.assign({}, layer, { visible: false }) :
        layer
    );

  case TOGGLE_LAYER:
    return state.map(layer =>
      layer.name === action.name ?
        Object.assign({}, layer, { visible: !layer.visible }) :
        layer
    );

  default:
    return state;
  }
}
