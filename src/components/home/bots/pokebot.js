import axios from 'axios';
import { addMessage } from '../actions';

const authorId = 1;

export function getPokemon(textSplit, dispatch) {
  const url = `https://pokeapi.co/api/v2/pokemon/${textSplit[1]}`;
  axios.get(url).then((response) => {
    const newMessage = {
      authorId,
      message: response.data.name,
      imageURL: response.data.sprites.front_default
    };
    dispatch(addMessage(newMessage));
  });
}

export function helpPokebot(dispatch) {
  const newMessage = {
    authorId,
    message: 'Ceci est le \n message d\'aide de Pokebot'
  };
  dispatch(addMessage(newMessage));
}
