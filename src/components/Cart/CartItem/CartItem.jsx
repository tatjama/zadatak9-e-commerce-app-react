import React from 'react';
import { Typography, Card, CardActions, CardMedia, CardContent , Button} from "@material-ui/core";

import useStyles from './styles';

const CartItem = ({item, onHandleUpdateToCardQyt, onHandleRemoveFromCard }) => {
    const classes = useStyles();
    return(
        <Card className={classes.card}>
            <CardMedia image = { item.image } alt = { item.title } className = { classes.media}/>
            <CardContent className={classes.cardContent }>
                <Typography variant = "h5"> {item.title} </Typography>
                <Typography variant = "h6"> {item.price} </Typography>

            </CardContent>
            <CardActions className = {classes.cardActions}>
                <div className = {classes.buttons}>
                    <Button 
                        type = "button" 
                        size = "small"
                        onClick = {() => onHandleUpdateToCardQyt(item.id, item.quantity - 1)}
                    >-</Button>
                        <Typography>{item.quantity}</Typography>
                    <Button 
                        type = "button" 
                        size = "small"
                        onClick = {() => onHandleUpdateToCardQyt(item.id, item.quantity + 1)}
                    >+</Button>
                </div>
                <Button 
                    type = "button" 
                    variant = "contained" 
                    color="secondary"
                    onClick = {() => onHandleRemoveFromCard(item.id)}
                >Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem;