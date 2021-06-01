import { actionsType } from './actions';

const initialState = {
  history: [],
  contacts: [
    { id: 1, name: 'pokebot', isBot: true },
    { id: 2, name: 'jot', isBot: true },
    { id: 3, name: 'bot', isBot: true }
  ]
};

const addMessage = (state, action) => ({
  ...state,
  history: [
    ...state.history,
    action.newMessage
  ]
});

const data = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.ADD_MESSAGE:
      return addMessage(state, action);
    default:
      return state;
  }
};

export default data;
