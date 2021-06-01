import { addMessage } from '../actions';

function toStringHour() {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}`;
}

export default function getHour(dispatch, author) {
  const newMessage = {
    author,
    message: toStringHour(),
    time: toStringHour()
  };
  dispatch(addMessage(newMessage));
}
