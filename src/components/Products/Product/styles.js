import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    maxWidth: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  product: {
    height: '100%',
  },  
  rootDetail: {
    maxWidth: '100%',
    textAlign: 'center'
  },  
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'contain',
  },
  title: {
    textDecoration: 'none',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardContent: {
    height: '100%',
  },
  loaderContainer: {
    width: '100%',        
  },
  loader: {
    margin: '100px auto',
    color: "#00BFFF",
    height: '40px',
    width: '40px',
  }

}));