import { makeStyles} from '@material-ui/core';

export default makeStyles(() => ({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'absolute',
        top: '0',
        left: '0',
    },
    containerThankYou: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        position: 'fixed',
        top: '0',
        left: '0',
    },
    modal: {
        width: '300px',
        backgroundColor: '#FFF',
        borderRadius: '10px',
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate( -50%, -50%)'
    },    
    cardActions:{
        display: 'flex',
        justifyContent: 'space-between',
    }
    

}))