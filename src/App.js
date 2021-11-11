import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route}  from 'react-router-dom';
import Loader from 'react-loader-spinner';

import { Products, Navbar, Cart, Modal, ModalThankYou} from './components';
import ProductDetail from "./components/Products/Product/ProductDetail";

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

  const handleSelectedCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    console.log(selectedCategory)
    fetch(url + selectedCategory + order)
    .then(res=>res.json())
    .then(data=>setProducts(data))
  }

  const handleSelectOrder = async(selectedOrder) => {
    setOrder(selectedOrder);
    let result = await fetch(url + category  + selectedOrder);
    let data = await result.json();

    setProducts(data)
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
    console.log(isItemAdded)
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
    console.log(cart)
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
    let newCart = {...cart};
    newCart.products = cart.products.filter( (item) => item.id !== productId);

    setCart(newCart);
  }
  
  const handleEmptyCard = () => {
    setCart(initialCart);
  }

  const postCartToAPI = (cart) => {
    fetch('https://fakestoreapi.com/carts',{
    method:"POST",
    body:JSON.stringify(cart)
  }).then(res=>res.json())
  .then(json=>{
    setOrderId(json._id); 
    setCart(initialCart);    
    setIsCartSent(true);
  })
  }

  const handleCheckOut = () => {
    let cartToAPIRecords = {
      userId: cart.userId,
      date: new Date(),
      products: cart.products.map((product) => {
        return {productId: product.id, quantity: product.quantity}
        })     
    };
    console.log(cartToAPIRecords);
    postCartToAPI(cartToAPIRecords);
  }

  console.log(cart)
  
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
            <Route path = "/product/:id" element = {<ProductDetail url = {url} onAddToCart = { handleAddToCart} />}/>
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


/**
 * const initialProductsSettings = async (data) => {
     await fetchCart();
    console.log(cart)
    console.log(data)
    data.map((product) => {
      const itemFoundIndex = cart.products.findIndex(cp => cp.id === product.id);
      console.log(itemFoundIndex);
      if(itemFoundIndex !== -1) {product.inCart = true}
      return product;
    })
    return data
  }

  const fetchProducts = async() => {
    let result = await fetch(url);
    let data = await result.json();
    data.forEach(product => {
      product.inCart = false
    })
    console.log(data);
    let initialProducts = initialProductsSettings(data);
    console.log(initialProducts)
    setIsLoading(false);
    setProducts(initialProducts);
  }

 */