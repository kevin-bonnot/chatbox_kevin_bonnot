// React/redux
import React, { useEffect, useRef, useCallback } from 'react';
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
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Custom
import { addMessage } from './actions';
import useStyles from './styles';
import { getPokemon, helpPokebot } from './bots/pokebot';
import { helpJot, randomJoke } from './bots/jot';
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
        case 'randomJoke':
          randomJoke(dispatch);
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
        <form noValidate autoComplete="off" onSubmit={onSubmit} className={classes.footer}>
          <TextField id="textfield" label="Votre message ..." variant="outlined" fullWidth onChange={onChangeTextField} />
        </form>
      </main>
    </div>
  );
};

const mapToProps = (store) => ({ data: store.data });

export default connect(mapToProps)(Home);
