import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
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
    height: '100%',
    flexGrow: 1,
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  list: {
    display: 'flex',
    flexDirection: 'column'
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
    maxWidth: '90%'
  }
}));

export default useStyles;
