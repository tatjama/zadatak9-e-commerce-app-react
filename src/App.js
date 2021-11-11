import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route}  from 'react-router-dom';
import Loader from 'react-loader-spinner';

import { Products, Navbar, Cart, Modal} from './components';
import ProductDetail from "./components/Products/Product/ProductDetail";

import useStyles from './styles';

const App = () => {
  const classes = useStyles(); 
  const [ isLoading, setIsLoading ] = useState(true);
  const [ products, setProducts ] = useState([]);
  const [ category, setCategory ] = useState("");
  const [ categories, setCategories ] = useState([]);
  const [ cart, setCart ] = useState([]);
  const [ order, setOrder ] = useState('');
  const [isItemAdded, setIsItemAdded ] = useState(false);

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
    setCart(cart || []);
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
    const itemFoundIndex = cart.findIndex(cp => cp.id === productId);
    let newCart;
    if(itemFoundIndex !== -1) {
      newCart = cart.map((item, i) => 
    i === itemFoundIndex? { ...item, quantity: item.quantity + 1, sum: (item.quantity + 1) * item.price } : item
      )
    }else{
      const item = products.filter(p => p.id === productId);
      item[0].sum = item[0].price;
      item[0].quantity = quantity;
       newCart = [...cart, item[0]];
    }
    return newCart;
  }

  const handleItemAdded = () => {
    setIsItemAdded(!isItemAdded);
    console.log(isItemAdded)
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
    const itemFoundIndex = cart.findIndex(cp => cp.id === productId);
    let newCart;
    if(itemFoundIndex !== -1) {
      newCart = cart.map((item, i) => 
    i === itemFoundIndex? { ...item, quantity: quantity, sum: (item.quantity) * item.price } : item
      )
    }
    setCart(newCart);
  }
  
  const handleRemoveFromCard = (productId) => {
    let newCart = cart.filter( (item) => item.id !== productId)
    setCart(newCart);
  }
  
  const handleEmptyCard = () => {
    setCart([]);
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
        <Navbar totalItems = {cart.length}/>
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
              cart = {cart}
              handleUpdateToCartQyt = {handleUpdateToCartQyt}
              handleRemoveFromCard = {handleRemoveFromCard}
              handleEmptyCard = {handleEmptyCard}
              />}/>            
          </Routes>
          {isItemAdded && <Modal isItemAdded = {isItemAdded} handleItemAdded = {handleItemAdded}/>}          
      </div>
    </Router>
  )
}

export default App;

/* const handleAddToCart = (productId, quantity) => {
  fetch('https://fakestoreapi.com/carts',{
    method:"POST",
    body:JSON.stringify(
        {
            userId:5,
            date:new Date(),
            products:[{productId:productId,quantity:quantity}]
        }
    )
  }).then(res=>res.json())
  .then(json=>{
    console.log(json); 
    let updatedCart = addingItemToCart(productId, quantity);
    setCart(updatedCart);    
    setIsItemAdded(true);
  })
}*/





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
