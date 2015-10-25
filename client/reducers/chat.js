import {
  ADD_PARTICIPANT, REMOVE_PARTICIPANT, SEND_CHAT_MESSAGE
}
from '../actions';

const initialState = {
  participants: {},
  messages: []
};

export default function layers(state = initialState, action) {
  switch (action.type) {

  case ADD_PARTICIPANT:
    const participants = {};
    participants[action.id] = {
      color: action.color,
      name: action.name
    };
    return Object.assign({}, state, { participants });

  case REMOVE_PARTICIPANT:

  case SEND_CHAT_MESSAGE:
    return {...state,
    messages: [
      {
        participantId: action.participantId,
        message: action.message
      },
      ...state.messages
    ]
  };

  default:
    return state;
  }
}
