import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  media: {
    height: 260,
    backgroundSize: 'contain',
  },
  cardContent: {
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cartActions: {
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}));