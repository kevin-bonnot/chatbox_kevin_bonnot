// React/redux
import React, {
  useEffect,
  useRef,
  useCallback,
  createRef
} from 'react';
import { useSelector, connect } from 'react-redux';

// Material imports
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { IconButton, InputBase } from '@material-ui/core';
import { Send } from '@material-ui/icons';

// Custom
import { addMessage } from './actions';
import useStyles from './styles';
import { getMove, getPokemon, helpPokebot } from './bots/pokebot';
import { helpJot, randomChuckFact, randomJoke } from './bots/jot';
import { helpBot, getFoodImage, getForm } from './bots/bot';
import getHour from './bots/common';

const Message = ({ message }) => {
  const classes = useStyles();
  if (!message.imageURL) {
    return (
      <div className={[message.author.authorId === 0 ? classes.ownMessage : classes.otherMessage, classes.message].join(' ')}>
        <div>
          <img className={classes.avatar} src={message.author.avatar} alt="Message" />
          <div>
            <strong>{message.author.name}</strong>
            <br />
            {message.time}
          </div>
        </div>
        {message.message}
      </div>
    );
  }
  return (
    <div className={[message.author.authorId === 0 ? classes.ownMessage : classes.otherMessage, classes.message].join(' ')}>
      <div>
        <img className={classes.avatar} src={message.author.avatar} alt="Message" />
        <div>
          <strong>{message.author.name}</strong>
          <br />
          {message.time}
        </div>
      </div>
      {message.message}
      <img className={classes.messageImage} src={message.imageURL} alt="Message" />
    </div>
  );
};

const Home = (props) => {
  const bottomRef = useRef(null);
  const classes = useStyles();
  const { history, contacts } = useSelector((state) => state.data);
  const { dispatch } = props;
  let textInput = '';
  const textInputRef = createRef();

  const scroll = () => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scroll();
  }, [history]);

  const botActions = useCallback((message) => {
    if (message) {
      const textSplit = message.message.split(' ');
      if (message.author.authorId === 0) {
        switch (textSplit[0]) {
          case 'help':
            helpPokebot(dispatch);
            helpJot(dispatch);
            helpBot(dispatch);
            break;
          case 'pokemon':
            getPokemon(textSplit, dispatch);
            break;
          case 'fact':
            randomChuckFact(dispatch);
            break;
          case 'food':
            getFoodImage(dispatch);
            break;
          case 'form':
            getForm(dispatch);
            break;
          case 'joke':
            randomJoke(dispatch);
            break;
          case 'pokemove':
            getMove(textSplit, dispatch);
            break;
          case 'hour':
            getHour(dispatch, { id: 1, name: 'pokebot', avatar: 'src/assets/pokeball.png' });
            getHour(dispatch, { id: 2, name: 'jot', avatar: 'src/assets/chack.jpg' });
            getHour(dispatch, { id: 3, name: 'bot', avatar: 'src/assets/cheese.png' });
            break;
          default:
            break;
        }
      }
    }
  }, [dispatch]);

  useEffect(() => {
    botActions(history[history.length - 1]);
  }, [botActions, history]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (textInput !== '') {
      textInputRef.current.getElementsByTagName('input')[0].value = '';
      const date = new Date();
      dispatch(addMessage({ author: { authorId: 0, name: 'me', avatar: 'src/assets/cheese.png' }, message: textInput, time: `${date.getHours()}:${date.getMinutes()}` }));
    }
  };

  const onChangeTextField = (e) => {
    textInput = e.target.value;
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            chatbot.io
          </Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {contacts.map((contact) => (
              <ListItem button key={contact.id}>
                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                <ListItemText primary={contact.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.list}>
          {history.map((item) => <Message message={item} />)}
        </div>
        <div ref={bottomRef} />
        <div className={classes.footer}>
          <Paper component="form" className={classes.rootInput} onSubmit={onSubmit}>
            <InputBase placeholder="Your message" onChange={onChangeTextField} className={classes.input} ref={textInputRef} />
            <IconButton type="submit">
              <Send className={classes.sendButton} />
            </IconButton>
          </Paper>
        </div>
      </main>
    </div>
  );
};

const mapToProps = (store) => ({ data: store.data });

export default connect(mapToProps)(Home);
