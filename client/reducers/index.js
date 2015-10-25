import {
  combineReducers
}
from 'redux';

import layers from './layers';
import chat from './chat';

const rootReducer = combineReducers({
  layers,
  chat
});

export default rootReducer;
