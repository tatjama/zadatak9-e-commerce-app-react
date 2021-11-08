import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route}  from 'react-router-dom';

import { Products, Navbar, Cart} from './components';

/*const initialCart = [
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
]*/
const App = () => {
  
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchProducts = async() => {
    let result = await fetch('https://fakestoreapi.com/products/');
    let data = await result.json();

    setProducts(data);
  }

  const fetchCart = async() => {
    const cart = await JSON.parse(localStorage.getItem("cart"));
    setCart(cart || []);
  }

 const handleAddToCart = (productId, quantity) => {
    const itemFoundIndex = cart.findIndex(cp => cp.id === productId);

    let newCart;
    if(itemFoundIndex !== -1) {
      newCart = cart.map((item, i) => 
    i === itemFoundIndex? { ...item, quantity: item.quantity + 1, sum: (item.quantity + 1) * item.price } : item
      )
    }else{
      const item = products.filter(p => p.id === productId);
      console.log(item)
      item[0].sum = item.price;
      item[0].quantity = quantity;
      console.log(item[0])
       newCart = [...cart, ...item];
    }
    localStorage.setItem("cart", JSON.stringify(newCart));    
     setCart(newCart);
     
  }

  /*useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  },[cart])
  
  useEffect(() => {
    // PUT request using fetch with async/await
    async function updatePost() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React Hooks PUT Request Example' })
        };
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', requestOptions);
        const data = await response.json();
        setPostId(data.id);
    }

    updatePost();
}, []);
  */

const handleUpdateToCartQyt = () => {
  console.log('updateToCart')
}

const handleRemoveFromCard = () => {
  console.log('remove from card')
}

const handleEmptyCard = () => {
  console.log('empty card')
}

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [])


  console.log(cart)
  return (
    <Router>
      <div>
        <Navbar totalItems = {cart.length}/>
          <Routes>
            <Route exact  path = "/" element = {<Products products = {products} onAddToCart = { handleAddToCart}/>}/>
            <Route path = "/cart" element = {
            <Cart 
              cart = {cart}
              handleUpdateToCartQyt = {handleUpdateToCartQyt}
              handleRemoveFromCard = {handleRemoveFromCard}
              handleEmptyCard = {handleEmptyCard}
              />}/>            
          </Routes>
      </div>
    </Router>
  )
}

export default App;