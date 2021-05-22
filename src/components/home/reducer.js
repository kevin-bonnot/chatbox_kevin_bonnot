import { actionsType } from './actions';

const initialState = [
  { author: 'me', message: 'message 1' },
  { author: 'me', message: 'message 2' },
  { author: 'bot 1', message: 'message 3' },
  { author: 'me', message: 'message 4' }
];

const addMessage = (state, action) => {
  const stateUpdated = [...state];
  stateUpdated.push(action.newMessage);
  return stateUpdated;
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.ADD_MESSAGE:
      return addMessage(state, action);
    default:
      return state;
  }
};

export default data;
