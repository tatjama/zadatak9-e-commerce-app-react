import React, { useState, useEffect } from "react";
import Loader from 'react-loader-spinner';
import { useLocation } from 'react-router';
import { Grid, Card, CardMedia, CardContent, CardActions, Typography, IconButton} from "@material-ui/core";
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles';



const ProductDetail = ({ url, onAddToCart }) => {
    const location = useLocation();
    const [ product, setProduct ] = useState({});
    const [ isLoading, setIsLoading ] = useState(true);
    const classes = useStyles();
    const id = location.pathname.split('/')[2];
    
    useEffect(() => {    
        fetchProduct(url,id);
    }, [url,id])
    
    const fetchProduct = async(url,id) => {
        setIsLoading(true)
        const response = await fetch(url+id);
        const data = await response.json();
        setProduct(data)
        setIsLoading(false)
        console.log(data)
    }
    
    if(isLoading){
        return(
          <div className = {classes.loaderContainer}>
              <Loader type="Grid" className = {classes.loader}  />
          </div>
        )
      }

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
                    </Card>
                    <CardActions disableSpacing className = {classes.cardActions}>
                        <Typography variant = "h6" >
                            $ {product.price.toFixed(2)}
                        </Typography>
                        <IconButton area-label = "Add to Card" onClick = {() => onAddToCart(product.id, 1)} >
                            <AddShoppingCart/>
                        </IconButton>
                    </CardActions>
                </Grid>  
            </Grid>
        </div>
    )
}

export default ProductDetail;