import axios from 'axios';
import { addMessage } from '../actions';

const authorId = 3;

export function helpBot(dispatch) {
  const newMessage = {
    authorId,
    message: 'Ceci est le message \n d\'aide de Bot'
  };
  dispatch(addMessage(newMessage));
}

export function getFoodImage(dispatch) {
  const url = 'https://foodish-api.herokuapp.com/api';
  axios.get(url).then((response) => {
    const newMessage = {
      authorId,
      message: 'Random food picture',
      imageURL: response.data.image
    };
    dispatch(addMessage(newMessage));
  });
}
