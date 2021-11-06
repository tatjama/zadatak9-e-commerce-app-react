import React, { useState, useEffect } from 'react';

import { Products, Navbar} from './components';

const App = () => {
  /*const initialCart = {
    id: 1,
    products:[
      {
        productId: 7,
        quantity: 1
      },
      {
        productId: 8,
        quantity: 2
      }
    ],
    __v: 0
  }*/
  const initialCart = [
        {
        id: 5,
        title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        price: 695,
        category: "jewelery",
        image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
        quantity: 1,
      },
      {
        id: 9,
        title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
        price: 64,
        category: "electronics",
        image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
        quantity: 3
      }
    ]
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(initialCart);

  const fetchProducts = async() => {
    let result = await fetch('https://fakestoreapi.com/products/');
    let data = await result.json();

    setProducts(data);
  }

  const fetchCart = () => {
    const cart =JSON.parse(localStorage.getItem("cart"));
    setCart(cart || []);
  }

  const handleAddToCart = (productId, quantity) => {
    const itemFoundIndex = cart.findIndex(cp => cp.id === productId);
    /**naci da li postoji id */
    console.log(itemFoundIndex);
    let newCart;
    if(itemFoundIndex !== -1) {
      cart[itemFoundIndex].quantity += quantity;
    }else{
      const item = products.filter(p => p.id === productId);
      item[0].quantity = quantity;
       newCart = [...cart, item];
    }         
    //let newCart = JSON.parse(JSON.stringify(cart));
    //newCart.push(item);
    //cart.products.push({productId: productId, quantity: quantity});
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  }

  /*const handleAddToCart = (productId, quantity) => {
    const item 
    = cart.products.push({productId: productId, quantity: quantity});
    localStorage.setItem("cart", JSON.stringify(item));
    setCart(item);
  }*/

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [])

  console.log(cart)
  return (
    <div>
      <Navbar/>
      <Products products = {products} onAddToCart = { handleAddToCart}/>
    </div>
  )
}

export default App;