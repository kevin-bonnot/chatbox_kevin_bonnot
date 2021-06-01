import axios from 'axios';
import { addMessage } from '../actions';

const author = { authorId: 2, name: 'jot', avatar: 'src/assets/chuck.jpg' };

export function helpJot(dispatch) {
  const date = new Date();
  const newMessage = {
    author,
    message: 'I have 3 commands : "joke" displays a random joke, "fact" displays a random Chuck Norris Fact and "hour" display the current time',
    time: `${date.getHours()}:${date.getMinutes()}`
  };
  dispatch(addMessage(newMessage));
}

export function randomChuckFact(dispatch) {
  const url = 'https://api.chucknorris.io/jokes/random';
  axios.get(url).then((response) => {
    const date = new Date();
    const newMessage = {
      author,
      message: response.data.value,
      time: `${date.getHours()}:${date.getMinutes()}`
    };
    dispatch(addMessage(newMessage));
  });
}

export function randomJoke(dispatch) {
  const url = 'https://official-joke-api.appspot.com/random_joke';
  axios.get(url).then((response) => {
    const date = new Date();
    const newMessage1 = {
      author,
      message: response.data.setup,
      time: `${date.getHours()}:${date.getMinutes()}`
    };
    const newMessage2 = {
      author,
      message: response.data.punchline,
      time: `${date.getHours()}:${date.getMinutes()}`
    };
    dispatch(addMessage(newMessage1));
    setTimeout(() => dispatch(addMessage(newMessage2)), 1000);
  });
}
