import axios from 'axios';
import { addMessage } from '../actions';

export function getPokemon(textSplit, dispatch) {
  const url = `https://pokeapi.co/api/v2/pokemon/${textSplit[1]}`;
  axios.get(url).then((response) => {
    const newMessage = {
      authorId: 1,
      message: response.data.name,
      imageURL: response.data.sprites.front_default
    };
    dispatch(addMessage(newMessage));
  });
}

export function helpPokebot(dispatch) {
  const newMessage = {
    authorId: 1,
    message: 'Ceci est le message d\'aide de Pokebot'
  };
  dispatch(addMessage(newMessage));
}
