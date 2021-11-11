import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Button} from '@material-ui/core';
import  CartItem  from './CartItem/CartItem';

import useStyles from './styles';

const Cart = ({cart, handleUpdateToCartQyt, handleRemoveFromCard, handleEmptyCard, handleCheckOut}) => {
    const classes = useStyles();

    const EmptyCart = () => {
        return( 
        <Typography variant = 'subtitle1'>
            You have no items in your cart.
            <Link className={classes.link} to ="/">Start adding some</Link>
        </Typography>
        )
    }

    const FilledCart = () => {           
    const [sum, setSum] = useState(0);

    const calculateSum = () => {
        let tempSum = 0
        for(let i = 0; i < cart.length; i++){
            tempSum += cart[i].price * cart[i].quantity;            
        }
        setSum( tempSum.toFixed(2));
    }

    useEffect(() => {
        calculateSum();
    }, [])
    
        return(
            <>
                <div className = {classes.cardDetails}>
                    <Typography className= {classes.subtotal} variant = "h4" > Subtotal:  {sum } </Typography >
                    <Button 
                        className = {classes.emptyButton} 
                        size = "large" 
                        type = "button" 
                        variant = "contained" 
                        color = "secondary"
                        onClick = {handleEmptyCard}
                        >Empty Cart
                    </Button>
                    <Button 
                        className = {classes.checkoutButton} 
                        size = "large"                         
                        type = "button" 
                        variant = "contained" 
                        color = "primary"
                        onClick = {handleCheckOut}
                    >Checkout</Button>
                </div>
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
            </>
        )
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