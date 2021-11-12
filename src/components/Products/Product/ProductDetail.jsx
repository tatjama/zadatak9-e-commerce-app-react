import React, { useState, useEffect } from "react";
import Loader from 'react-loader-spinner';
import { useLocation } from 'react-router';

import { Grid, Card, CardMedia, CardContent, CardActions, Typography, IconButton} from "@material-ui/core";
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';

const ProductDetail = ({ cart, url, onAddToCart }) => {
    const location = useLocation();
    const classes = useStyles();
    const id = location.pathname.split('/')[2]*1;
    
    const [ product, setProduct ] = useState({});
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isInCart, setIsInCart ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    
    useEffect(() => {isProductInCart()})

    const isProductInCart = () => {
        let itemFoundIndex = cart.products.findIndex(product => product.id === id);
        if (itemFoundIndex !== -1){ setIsInCart(true) }
    }
    
    useEffect(() => {    
        fetchProduct(url,id);
    }, [url,id])
    
    const fetchProduct = async(url,id) => {
        setIsLoading(true)
        try{
            const response = await fetch(url+id);
            const data = await response.json();
        
            setProduct(data);
            setIsLoading(false);
        }catch(e){
            console.log(e);
            setIsLoading(false);
            setErrorMessage(e.message);
        }        
    }      
    
    if(isLoading){
        return(
          <div className = {classes.loaderContainer}>
              <Loader type="Grid" className = {classes.loader}  />
          </div>
        )
      }

    if(errorMessage){
        return(
          <div>
            <h1> Seems that something is wrong...!</h1>
            <h4>Error {errorMessage}</h4>
          </div>
        )
      }

      if(Object.keys(product).length){
    return (
        <div>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
                <Grid container  justifyContent = "center"  alignItems = "center"item xs = {11} sm = {5}  md = {4} lg = {6}>
                    <Card className = {classes.rootDetail} >
                        <div className = {classes.toolbar}/>
                        <CardContent className = {classes.cardContent}>
                            <Typography variant = "h6" gutterBottom>
                                {product.category}
                            </Typography>
                            <Typography variant = "h5" gutterBottom>
                                {product.title}
                            </Typography>
                        </CardContent>
                        <CardMedia className = {classes.media}  image = {product.image} title = {product.title}/>
                        <CardContent className = { classes.cardContent}>  
                            <Typography variant = "h6" gutterBottom >
                                Rating : {product.rating.rate}
                            </Typography>                                     
                            <Typography variant = "body2" color = "textSecondary">
                                {product.description}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing className = {classes.cardActions}>
                            <Typography variant = "h6" >
                                $ {product.price.toFixed(2)}
                            </Typography>
                            {
                            isInCart?   <Typography  variant = "body2" color = "primary">
                                           {product.title} is already in Cart
                                        </Typography>
                                      : <IconButton 
                                            area-label = "Add to Card" 
                                            onClick = {() => onAddToCart(product.id, 1)} 
                                        >
                                             <AddShoppingCart/>
                                        </IconButton>
                            }                        
                        </CardActions>
                    </Card>                    
                </Grid>  
            </Grid>
        </div>
    )}else{
        return(
            <div>
                <div className = {classes.toolbar}/>
              <h1> Seems that something is wrong...!</h1>
              <h4>Error {errorMessage}</h4>
            </div>
          )
    }
    
}

export default ProductDetail;