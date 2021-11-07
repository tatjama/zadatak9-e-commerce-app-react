import React, { useState, useEffect } from 'react';

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
    i === itemFoundIndex? { ...item, quantity: item.quantity + 1/*, sum: (item.quantity + 1) * item.price*/ } : item
      )
    }else{
      const item = products.filter(p => p.id === productId);
      //item[0].sum = item.price;
      item[0].quantity = quantity;
      
       newCart = [...cart, ...item];
    }
    localStorage.setItem("cart", JSON.stringify(newCart));    
     setCart(newCart);
     
  }

  /*useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  },[cart])*/


  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [])


  console.log(cart)
  return (
    <div>
      <Navbar totalItems = {cart.length}/>
      {/*<Products products = {products} onAddToCart = { handleAddToCart}/>*/}
      <Cart cart = {cart}/>
    </div>
  )
}

export default App;