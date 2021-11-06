import React from 'react';
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from "@material-ui/core";
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles';

const Product = ({product, onAddToCart}) => {
    const classes = useStyles();
    return (
        <div>
            <Card className = {classes.root}>
                <CardMedia className = {classes.media}  image = {product.image} title = {product.title}/>
                <CardContent >
                    <Typography variant = "h6" gutterBottom>
                            {product.category}
                    </Typography>
                    <div className = {classes.cardContent}>
                        <Typography variant = "h5" gutterBottom>
                            {product.title}
                        </Typography>
                        <Typography variant = "h5" >
                            {product.price}
                        </Typography>                        
                    </div>
                    
                    <Typography variant = "body2" color = "textSecondary">
                            {product.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing className = {classes.cardActions}>
                    <IconButton area-label = "Add to Card" onClick = {() => onAddToCart(product.id, 1)}>
                        <AddShoppingCart/>
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    )
}

export default Product;