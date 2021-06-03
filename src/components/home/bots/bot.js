import axios from 'axios';
import { addMessage } from '../actions';

const author = { authorId: 3, name: 'bot', avatar: 'src/assets/cheese.png' };

const forms = ['triangle', 'rectangle', 'circle'];

export function helpBot(dispatch) {
  const date = new Date();
  const newMessage = {
    author,
    message: 'I have 3 commands : "food" displays a random food picture, "form" displays a random form name and "hour" display the current time',
    time: `${date.getHours()}:${date.getMinutes() >= 10 ? '' : '0'}${date.getMinutes()}`
  };
  dispatch(addMessage(newMessage));
}

export function getFoodImage(dispatch) {
  const url = 'https://foodish-api.herokuapp.com/api';
  axios.get(url).then((response) => {
    const date = new Date();
    const newMessage = {
      author,
      message: 'Random food picture',
      imageURL: response.data.image,
      time: `${date.getHours()}:${date.getMinutes() >= 10 ? '' : '0'}${date.getMinutes()}`
    };
    dispatch(addMessage(newMessage));
  });
}

export function getForm(dispatch) {
  const ranNumber = Math.floor(Math.random() * 3);
  const date = new Date();
  const newMessage = {
    author,
    message: forms[ranNumber],
    time: `${date.getHours()}:${date.getMinutes() >= 10 ? '' : '0'}${date.getMinutes()}`
  };
  dispatch(addMessage(newMessage));
}
