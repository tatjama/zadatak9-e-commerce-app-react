import React from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";

import useStyles from './styles';

/*const products = [{id: 1, name: "First", description: "First product", price: "$5", image : "https://www.denofgeek.com/wp-content/uploads/2021/03/best-pc-games-2021.jpg?resize=768%2C432"},
{id: 2, name: "Second", description: "Second product", price: "$10", image : "https://www.denofgeek.com/wp-content/uploads/2021/03/best-pc-games-2021.jpg?resize=768%2C432"},
{id: 3, name: "Third", description: "Third product", price: "$15", image : "https://www.denofgeek.com/wp-content/uploads/2021/03/best-pc-games-2021.jpg?resize=768%2C432"},
{id: 4, name: "Fourth", description: "Fourth product", price: "$20", image : "https://www.denofgeek.com/wp-content/uploads/2021/03/best-pc-games-2021.jpg?resize=768%2C432"}
]*/

const Products = ({products, onAddToCart}) => {
    const classes = useStyles();

    return(
        <main className = {classes.content}>
            <div className = {classes.toolbar}/>
            <Grid container justifyContent = "center" spacing = {4}>
                {products.map(product => {
                    return(
                        <Grid item key = {product.id} xs = {12} sm = {6}  md = {4} lg = {3}> 
                            <Product product = {product} onAddToCart = {onAddToCart}/>
                        </Grid>
                    )
                })

                }
            </Grid>
        </main>
    )
}

export default Products;