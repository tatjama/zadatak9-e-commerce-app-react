import React from 'react';
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from "@material-ui/core";
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles';

const Product = ({product, onAddToCart}) => {
    const classes = useStyles();
    return (
        <div >
            <Card className = {classes.root}>
                <CardMedia className = {classes.media}  image = {product.image} title = {product.title}/>
                <CardContent className = { classes.cardContent}>
                    <Typography variant = "body2" gutterBottom>
                            {product.category}
                    </Typography>
                        <Typography variant = "h6" gutterBottom>
                            {product.title}
                        </Typography>
                                                
                    
                    
                    <Typography variant = "body2" color = "textSecondary">
                            {product.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing className = {classes.cardActions}>
                        <Typography variant = "h6" >
                            $ {product.price}
                        </Typography>
                    <IconButton area-label = "Add to Card" onClick = {() => onAddToCart(product.id, 1)}>
                        <AddShoppingCart/>
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    )
}

export default Product;