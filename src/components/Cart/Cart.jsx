import React from 'react';
import { Container, Typography, Grid, Button} from '@material-ui/core';

import useStyles from './styles';

const Cart = ({cart}) => {
    const classes = useStyles();
    //const isEmpty = !cart.length;

    const EmptyCart = () => {
        return( 
        <Typography variant = 'subtitle1'>
            You have no items in your cart.
        </Typography>
        )
    }

    const FilledCart = () => {
           /*let val =    cart.reduce((a,b) => ({
                    sum: a.sum + b.sum,
                }))
                console.log(val.sum)*/
        return(<>
            <Grid container spacing = {3}>
                { cart.map((item) => (                
                        <Grid item xs = {12} sm = {4} key = {item.id}>
                            {item.title}
                        </Grid>                
                )) }
            </Grid>
            <div className={classes.cardDetails}>
                    <Typography variant = "h4">
                        Subtotal: {cart.reduce((a, b , total) => total += (a.quantity * a.price) + (b.quantity * b.price))}
                    </Typography>
                    <Button className = {classes.emptyButton} size = "large" type = "button" variant = "contained" color = "secondary">Empt Cart</Button>
                    <Button className = {classes.checkoutButton} size = "large" type = "button" variant = "contained" color = "primary">Checkout</Button>
            </div>
        </>)
    }
    
    if(!cart) return "Loading...";

    return(
        <Container>
            <div className="classes.toolbar"/>
            <Typography className="classes.title" variant = "h3">
                Shopping cart
            </Typography>
            { !cart.length? <EmptyCart/>: <FilledCart/> }
        </Container>
    )
}

export default Cart