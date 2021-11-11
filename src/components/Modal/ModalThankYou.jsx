import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography, Card, CardActions, CardContent , Button} from "@material-ui/core";
import useStyles from './styles';

const ModalThankYou = ({orderId, isCartSent, handleCartSent}) => {
    const classes = useStyles();
    const navigate = useNavigate();
    
    const onClose = () => {
        navigate('/');
        handleCartSent(!isCartSent)
        
    }
    const onCheckOut = () => {        
        handleCartSent(!isCartSent);
    }
    return(
        <Card className = { classes.containerThankYou } >
            <CardContent className = { classes.modal}>
                <Typography variant = "h6" gutterBottom>
                    Thank You! Your order number is {orderId}.
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

export default ModalThankYou;