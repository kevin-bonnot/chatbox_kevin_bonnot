import { actionsType } from './actions';

const initialState = {
  history: [
    { authorId: 0, message: 'message 1' },
    { authorId: 0, message: 'message 2' },
    { authorId: 1, message: 'message 3', imageURL: 'https://img-19.ccm2.net/8vUCl8TXZfwTt7zAOkBkuDRHiT8=/1240x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg' },
    { authorId: 0, message: 'message 4' }
  ],
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
