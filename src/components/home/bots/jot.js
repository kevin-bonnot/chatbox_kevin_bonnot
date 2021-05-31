// import axios from 'axios';
import { addMessage } from '../actions';

const authorId = 2;

export function helpJot(dispatch) {
  const newMessage = {
    authorId,
    message: 'Ceci est le message \n d\'aide de Jot'
  };
  dispatch(addMessage(newMessage));
}

export function randomJoke(dispatch) {
  const newMessage = {
    authorId,
    message: 'Ceci est une blague au hasard'
  };
  dispatch(addMessage(newMessage));
}
