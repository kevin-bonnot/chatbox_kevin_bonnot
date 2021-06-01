import axios from 'axios';
import { addMessage } from '../actions';

const author = { authorId: 1, name: 'pokebot', avatar: 'src/assets/pokeball.png' };

export function getPokemon(textSplit, dispatch) {
  const url = `https://pokeapi.co/api/v2/pokemon/${textSplit[1]}`;
  axios.get(url).then((response) => {
    const date = new Date();
    const newMessage = {
      author,
      message: response.data.name,
      imageURL: response.data.sprites.front_default,
      time: `${date.getHours()}:${date.getMinutes()}`
    };
    dispatch(addMessage(newMessage));
  });
}

export function getMove(textSplit, dispatch) {
  const url = `https://pokeapi.co/api/v2/move/${textSplit[1]}`;
  axios.get(url).then((response) => {
    const date = new Date();
    const newMessage = {
      author,
      message: `${response.data.name}: ${response.data.accuracy}%`,
      time: `${date.getHours()}:${date.getMinutes()}`
    };
    dispatch(addMessage(newMessage));
  });
}

export function helpPokebot(dispatch) {
  const date = new Date();
  const newMessage = {
    author,
    message: 'I have 3 commands : "pokemon <englishName or id>" displays the pokename and its sprite, "pokemove <englishame or id>" displays the name of the move and its accuracy and "hour" display the current time',
    time: `${date.getHours()}:${date.getMinutes()}`
  };
  dispatch(addMessage(newMessage));
}
