export const ADD_LAYER = 'ADD_LAYER';
export const SHOW_LAYER = 'SHOW_LAYER';
export const HIDE_LAYER = 'HIDE_LAYER';
export const TOGGLE_LAYER = 'TOGGLE_LAYER';

export const ADD_PARTICIPANT = 'ADD_PARTICIPANT';
export const REMOVE_PARTICIPANT = 'REMOVE_PARTICIPANT';
export const SEND_CHAT_MESSAGE = 'SEND_CHAT_MESSAGE';

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

export const addParticipant = (participant) => {
  return { type: ADD_PARTICIPANT, ...participant };
};

export const removeParticipant = (id) => {
  return { type: REMOVE_PARTICIPANT, id };
};

export const sendChatMessage = (participantId, message) => {
  return { type: SEND_CHAT_MESSAGE, participantId, message };
};
