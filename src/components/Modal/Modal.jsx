import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Card, CardActions, CardContent , Button} from "@material-ui/core";
import useStyles from './styles';

const Modal = ({itemTitle, isItemAdded, handleItemAdded}) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const onClose = () => {
        handleItemAdded(!isItemAdded)        
    }
    const onCheckOut = () => {
        navigate('/cart');
        handleItemAdded(!isItemAdded);
    }

    return(
        <Card className = { classes.container } >
            <CardContent className = { classes.modal}>
                <Typography variant = "h6" gutterBottom>
                    {itemTitle} is successfully added to your cart!
                </Typography>             
                <CardActions className = { classes.cardActions}>
                    <Button type = "button" size = "small" variant = "contained" color = "secondary"
                         onClick = { onClose } >Close
                    </Button>
                    <Button type = "button" size = "small" variant = "contained" color = "primary"
                         onClick = { onCheckOut } >Checkout
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default Modal;