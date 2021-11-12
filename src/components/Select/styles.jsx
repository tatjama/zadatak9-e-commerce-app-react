import { makeStyles } from '@material-ui/core/styles';

export default makeStyles (() => ({
    container:{
        textAlign: 'center',
    },
    selects:{
        width: '330px',
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0 auto',
    },
    
    selectForm: {
        width: '150px',
        padding: '5px 10px',
        margin: '10px 5px',
        border: '1px solid transparent',
        textAlign: 'center',
        backgroundColor:'white',
        borderBottom: '1px solid gray',
        boxShadow: '5px 5px 10px  rgba(0,0,0,0.1)',
        textTransform: 'uppercase',
    },
    text: {
        color: 'gray',
    }
}))

