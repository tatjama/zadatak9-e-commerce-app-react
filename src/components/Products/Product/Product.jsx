import React from 'react';
import { Link } from 'react-router-dom';
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from "@material-ui/core";
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles';

const Product = ({product, onAddToCart}) => {
    const classes = useStyles();

    return (
        <div className = {classes.product} >
            <Card className = {classes.root}>
                <Link className = {classes.title} to = {`/product/${product.id}`}> 
                    <CardMedia className = {classes.media}  image = {product.image} title = {product.title}/>
                    <CardContent className = { classes.cardContent}>
                        <Typography variant = "body2" gutterBottom color = "textSecondary">
                            {product.category}
                        </Typography>
                        <Typography variant = "h6" gutterBottom color = "textPrimary">
                            {product.title}
                        </Typography>
                    </CardContent>
                </Link>
                <CardActions disableSpacing className = {classes.cardActions}>
                        <Typography variant = "h6" >
                            $ {product.price.toFixed(2)}
                        </Typography>
                        {
                            product.inCart? <Typography variant = "body2" color = "secondary">
                                                in Cart
                                            </Typography>
                                            :<IconButton 
                                                area-label = "Add to Card" 
                                                onClick = {() => onAddToCart(product.id, 1)}
                                            >
                                                <AddShoppingCart/>
                                            </IconButton>
                        }                    
                </CardActions>
            </Card>
        </div>
    )
}

export default Product;