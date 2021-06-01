import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
const footerHeight = 75;
const appBarHeight = 60;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: appBarHeight
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerContainer: {
    overflow: 'auto'
  },
  content: {
    overflow: 'auto',
    height: '100%',
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: appBarHeight + theme.spacing(3),
    offset: theme.mixins.toolbar,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: footerHeight

  },
  ownMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0099FF',
    color: 'white'
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E4E6EB'
  },
  message: {
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    maxWidth: '90%',
    display: 'flex',
    flexDirection: 'column'
  },
  messageImage: {
    maxWidth: '400px',
    maxHeight: '400px'
  },
  footer: {
    backgroundColor: '#FAFAFA',
    height: footerHeight,
    position: 'fixed',
    bottom: 0,
    width: '100%',
    paddingBottom: '10px',
    paddingRight: drawerWidth + 50
  },
  rootInput: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  sendButton: {
    color: '#0099FF'
  },
  avatar: {
    height: 30,
    width: 30
  }
}));

export default useStyles;
