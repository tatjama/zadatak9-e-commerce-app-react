import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route}  from 'react-router-dom';
import Loader from 'react-loader-spinner';

import { Products, ProductDetail, Navbar, Cart, Modal, ModalThankYou} from './components';

import useStyles from './styles';

const initialCart = {
  userId: 5,
  date: new Date(),
  products: [],
}

const App = () => {
  const classes = useStyles(); 
  const [ isLoading, setIsLoading ] = useState(true);
  const [ products, setProducts ] = useState([]);
  const [ category, setCategory ] = useState("");
  const [ categories, setCategories ] = useState([]);
  const [ cart, setCart ] = useState(initialCart);
  const [ order, setOrder ] = useState('');
  const [ isItemAdded, setIsItemAdded ] = useState(false);
  const [ itemTitle, setItemTitle ] = useState('');
  const [ isCartSent, setIsCartSent ] = useState(false);
  const [ orderId, setOrderId ] = useState(0);

  const url = 'https://fakestoreapi.com/products/';

  const fetchProducts = async() => {
    let result = await fetch(url);
    let data = await result.json();
    
    let cart = await JSON.parse(localStorage.getItem("cart"));
    data.map((product) => {
      const itemFoundIndex = cart.products.findIndex(cp => cp.id === product.id);
      if(itemFoundIndex !== -1) {product.inCart = true}
      return product;
    })
    setIsLoading(false);
    setProducts(data);
  }

  const fetchCategories = async() => {
    let result = await fetch(`${url}categories`);
    let data = await result.json();

    setCategories(data);
  }

  const fetchCart = async() => {
    const cart = await JSON.parse(localStorage.getItem("cart"));

    setCart(cart || initialCart);    
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchCart();
  }, [])

  const handleSelectedCategory = async (selectedCategory) => {
    setCategory(selectedCategory);
    let response = await  fetch(url + selectedCategory + order);
    let data = await response.json();

    setProducts(data);
  }

  const handleSelectOrder = async(selectedOrder) => {
    setOrder(selectedOrder);
    let response = await fetch(url + category  + selectedOrder);
    let data = await response.json();

    setProducts(data);
  }


  const addingItemToCart =(productId, quantity) => {
    const itemFoundIndex = cart.products.findIndex(cp => cp.id === productId);
    let newCart = {...cart};
    if(itemFoundIndex !== -1) {
      newCart.products = cart.products.map((item, i) => 
    i === itemFoundIndex? { ...item, quantity: item.quantity + 1, sum: (item.quantity + 1) * item.price } : item
      )
    }else{
      const item = products.filter(p => p.id === productId);
      item[0].sum = item[0].price;
      item[0].quantity = quantity;
      item[0].inCart = true;
      setItemTitle(item[0].title);
      newCart.products = [...cart.products, item[0]];
    }
    return newCart;
  }

  const handleItemAdded = () => {
    setIsItemAdded(!isItemAdded);
    }

  const handleCartSent = () => {
    setIsCartSent(!isCartSent);
    }

 const handleAddToCart = (productId, quantity) => {  
    let updatedCart = addingItemToCart(productId, quantity);
    setCart(updatedCart);    
    setIsItemAdded(true);  
}  

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart])


  const handleUpdateToCartQyt = (productId ,quantity ) => {
    const itemFoundIndex = cart.products.findIndex(cp => cp.id === productId);
    let newCart = {...cart};
    if(itemFoundIndex !== -1) {
      newCart.products = cart.products.map((item, i) => 
    i === itemFoundIndex? { ...item, quantity: quantity, sum: (item.quantity) * item.price } : item
    )}

    setCart(newCart);
  }
  
  const handleRemoveFromCard = (productId) => {
    let tempCart = {...cart};
    tempCart.products = cart.products.filter( (item) => item.id !== productId);
    let tempProducts = [...products];
    tempProducts.map(product => {
      if(product.id === productId) {product.inCart = false}
      return product;
    }) 
    setProducts(tempProducts);
    setCart(tempCart);
  }
  
  const handleEmptyCard = () => {
    let tempProducts = [...products];
    tempProducts.forEach(product => {product.inCart = false})
    setProducts(tempProducts);
    setCart(initialCart);
  }

  const postCartToAPI = async (cart) => {
  let response = await  fetch('https://fakestoreapi.com/carts',{
    method:"POST",
    body:JSON.stringify(cart)
  })
  let data = await response.json();

    setOrderId(data._id);
    handleEmptyCard();   
    setIsCartSent(true);  
  }

  const handleCheckOut = () => {
    let cartToAPIRecords = {
      userId: cart.userId,
      date: new Date(),
      products: cart.products.map((product) => {
        return {productId: product.id, quantity: product.quantity}
        })     
    };
    postCartToAPI(cartToAPIRecords);
  }

  if(isLoading){
    return(
      <div className = {classes.loaderContainer}>
          <Loader type="Grid" className = {classes.loader}  />
      </div>
    )
  }

  return (
    <Router>
      <div className = {classes.container}>        
        <Navbar totalItems = {cart.products.length}/>
          <Routes>
            <Route 
              exact  
              path = "/" 
              element = {<Products 
                            products = {products} 
                            onAddToCart = { handleAddToCart}
                            onSelectCategory = {handleSelectedCategory }
                            onSelectOrder = {handleSelectOrder}
                            isItemAdded = {isItemAdded}
                            categories = {categories}
                        />}
            />
            <Route path = "/product/:id" element = {<ProductDetail cart = { cart } url = {url} onAddToCart = { handleAddToCart} />}/>
            <Route path = "/cart" element = {
            <Cart 
              cart = {cart.products}
              handleUpdateToCartQyt = {handleUpdateToCartQyt}
              handleRemoveFromCard = {handleRemoveFromCard}
              handleEmptyCard = {handleEmptyCard}
              handleCheckOut = {handleCheckOut}
              />}/>            
          </Routes>
          {isItemAdded && <Modal itemTitle = {itemTitle} isItemAdded = {isItemAdded} handleItemAdded = {handleItemAdded}/>}
          {isCartSent && <ModalThankYou orderId = {orderId} isCartSent = {isCartSent} handleCartSent = {handleCartSent}/>}          
      </div>
    </Router>
  )
}

export default App;


