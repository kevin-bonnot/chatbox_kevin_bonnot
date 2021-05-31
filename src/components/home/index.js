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
import { getPokemon, helpPokebot } from './bots/pokebot';
import { helpJot, randomChuckFact } from './bots/jot';
import { helpBot, doSomething } from './bots/bot';

const Message = ({ message }) => {
  const classes = useStyles();
  if (!message.imageURL) {
    return (
      <div className={[message.authorId === 0 ? classes.ownMessage : classes.otherMessage, classes.message].join(' ')}>
        {message.message}
      </div>
    );
  }
  return (
    <div className={[message.authorId === 0 ? classes.ownMessage : classes.otherMessage, classes.message].join(' ')}>
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
    const textSplit = message.message.split(' ');
    if (message.authorId === 0) {
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
        case 'doSomething':
          doSomething(dispatch);
          break;
        default:
          break;
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
      dispatch(addMessage({ authorId: 0, message: textInput }));
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
