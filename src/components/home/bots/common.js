import { addMessage } from '../actions';

function toStringHour() {
  const date = new Date();
  return `${date.getHours()}${date.getMinutes() >= 10 ? '' : '0'}:${date.getMinutes()}`;
}

export default function getHour(dispatch, author) {
  const newMessage = {
    author,
    message: `It's ${toStringHour()}`,
    time: toStringHour()
  };
  dispatch(addMessage(newMessage));
}
