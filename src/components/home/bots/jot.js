import axios from 'axios';
import { addMessage } from '../actions';

const authorId = 2;

export function helpJot(dispatch) {
  const newMessage = {
    authorId,
    message: 'Ceci est le message \n d\'aide de Jot'
  };
  dispatch(addMessage(newMessage));
}

export function randomChuckFact(dispatch) {
  const url = 'https://api.chucknorris.io/jokes/random';
  axios.get(url).then((response) => {
    const newMessage = {
      authorId,
      message: response.data.value
    };
    dispatch(addMessage(newMessage));
  });
}
