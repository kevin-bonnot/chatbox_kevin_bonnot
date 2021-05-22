export const actionsType = {
  ADD_MESSAGE: 'ADD_MESSAGE'
};

export const addMessage = (newMessage) => ({
  type: actionsType.ADD_MESSAGE,
  newMessage
});
