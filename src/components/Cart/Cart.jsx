import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Button} from '@material-ui/core';
import  CartItem  from './CartItem/CartItem';

import useStyles from './styles';

const Cart = ({cart, handleUpdateToCartQyt, handleRemoveFromCard, handleEmptyCard}) => {
    const classes = useStyles();
    //const isEmpty = !cart.length;

    const EmptyCart = () => {
        return( 
        <Typography variant = 'subtitle1'>
            You have no items in your cart.
            <Link className={classes.link} to ="/">Start adding some</Link>
        </Typography>
        )
    }

    const FilledCart = () => {
           let val =    cart.reduce((a,b) => ({
                    sum: a.sum + b.sum,
                }))
                console.log(val.sum)
        return(<>
            <Grid container spacing = {3}>
                { cart.map((item) => (                
                        <Grid item xs = {12} sm = {4} key = {item.id}>
                            <CartItem 
                                item = {item} 
                                onHandleUpdateToCardQyt = {handleUpdateToCartQyt}
                                onHandleRemoveFromCard = {handleRemoveFromCard}
                            />
                        </Grid>                
                )) }
            </Grid>
            <div className = {classes.cardDetails}>
                    <Typography variant = "h4">
                        Subtotal:
                        {cart.reduce((a, b , total) => total += (a.quantity * a.price) + (b.quantity * b.price)).toFixed(2)}
                    </Typography>
                    <Button 
                        className = {classes.emptyButton} 
                        size = "large" 
                        type = "button" 
                        variant = "contained" 
                        color = "secondary"
                        onClick = {handleEmptyCard}
                        >Empty Cart
                    </Button>
                    <Button className = {classes.checkoutButton} size = "large" type = "button" variant = "contained" color = "primary">Checkout</Button>
            </div>
        </>)
    }
    
    if(!cart) return "Loading...";

    return(
        <Container>
            <div className={ classes.toolbar }/>
            <Typography className={ classes.title } variant = "h3" gutterBottom>
                Shopping cart
            </Typography>
            { !cart.length? <EmptyCart/>: <FilledCart/> }
        </Container>
    )
}

export default Cart