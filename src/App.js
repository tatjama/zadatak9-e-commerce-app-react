import React from 'react';
import {BrowserRouter as Router, Routes, Route}  from 'react-router-dom';
import Loader from 'react-loader-spinner';

import { Products, ProductDetail, Navbar, Cart, Modal, ModalThankYou } from './components';
import useService from './hooks/useService';
import useStyles from './styles';

const url = 'https://fakestoreapi.com/products/';

const App = () => {
  const classes = useStyles();
  const {isLoading, products, categories, cart, itemTitle, orderId, errorMessage, isItemAdded, 
        isCartSent, setIsItemAdded, setIsCartSent, handleAddToCart, handleSelectOrder, 
        handleSelectedCategory, handleEmptyCard, handleCheckOut, handleRemoveFromCard, 
        handleUpdateToCartQyt } = useService();
  

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
          {isItemAdded && <Modal itemTitle = {itemTitle} isItemAdded = {isItemAdded} handleItemAdded = {setIsItemAdded}/>}
          {isCartSent && <ModalThankYou orderId = {orderId} isCartSent = {isCartSent} handleCartSent = {setIsCartSent}/>}          
      </div>
    </Router>
  )
}

export default App;


