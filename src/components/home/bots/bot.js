// import axios from 'axios';
import { addMessage } from '../actions';

const authorId = 3;

export function helpBot(dispatch) {
  const newMessage = {
    authorId,
    message: 'Ceci est le message \n d\'aide de Bot'
  };
  dispatch(addMessage(newMessage));
}

export function doSomething(dispatch) {
  const newMessage = {
    authorId,
    message: 'Je sais pas encore'
  };
  dispatch(addMessage(newMessage));
}
