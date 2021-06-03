import { actionsType } from './actions';

const initialState = {
  history: [],
  contacts: [
    {
      id: 1, name: 'pokebot', isBot: true, avatar: '/src/assets/pokeball.png'
    },
    {
      id: 2, name: 'jot', isBot: true, avatar: '/src/assets/chuck.jpg'
    },
    {
      id: 3, name: 'bot', isBot: true, avatar: '/src/assets/cheese.png'
    }
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
