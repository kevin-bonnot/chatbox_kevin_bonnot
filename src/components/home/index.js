// React/redux
import React from 'react';
import { connect } from 'react-redux';

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

const Message = ({ message }) => {
  const classes = useStyles();
  return (
    <div className={[message.author === 'me' ? classes.ownMessage : classes.otherMessage, classes.message].join(' ')}>
      {message.message}
    </div>
  );
};

const Home = (props) => {
  const classes = useStyles();
  const { data, dispatch } = props;
  let textInput = '';

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addMessage({ author: 'me', message: textInput }));
  };

  const onChangeTextField = (e) => {
    textInput = e.target.value;
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            chatbot.io
          </Typography>
        </Toolbar>
      </AppBar>
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
            <ListItem button key="first">
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary="Premier contact" />
            </ListItem>
            <ListItem button key="second">
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary="Deuxième contact" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.list}>
          {data.map((item) => <Message message={item} />)}
        </div>
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <TextField id="textfield" label="Votre message ..." variant="outlined" fullWidth onChange={onChangeTextField} />
        </form>
      </main>
    </div>
  );
};

const mapToProps = (store) => ({ data: store.data });

export default connect(mapToProps)(Home);
