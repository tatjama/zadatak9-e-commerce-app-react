import { useState, useEffect } from 'react';
import useToggle from './useToggle';

const initialCart = {
    userId: 5,
    date: new Date(),
    products: [],
  }

const url = 'https://fakestoreapi.com/products/';  

const useService = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ products, setProducts ] = useState([]);
  const [ category, setCategory ] = useState("");
  const [ categories, setCategories ] = useState([]);
  const [ cart, setCart ] = useState(initialCart);
  const [ order, setOrder ] = useState('');
  const [ itemTitle, setItemTitle ] = useState('');
  const [ orderId, setOrderId ] = useState(0);
  const [ errorMessage, setErrorMessage ] = useState('');
  
  const [ isItemAdded, setIsItemAdded ] = useToggle(false);
  
  const [ isCartSent, setIsCartSent ] = useToggle(false);


    const fetchProducts = async() => {
      try {
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
      }catch(e) {
        console.log(e);
        setIsLoading(false);
        setErrorMessage(e.message);
      }
    }
  
    const fetchCategories = async() => {
      try{
        let result = await fetch(`${url}categories`);
        let data = await result.json();
    
        setCategories(data);
      }catch(e){
        console.log(e);
        setIsLoading(false);
        setErrorMessage(e.message);
      }    
    }
  
    const fetchCart = async() => {
      try{
        const cart = await JSON.parse(localStorage.getItem("cart"));
  
        setCart(cart || initialCart);
      }catch(e){
        console.log(e);
        setIsLoading(false);
        setErrorMessage(e.message);
      }        
    }
  
    useEffect(() => {
      fetchProducts();
      fetchCategories();
      fetchCart();
    }, [])
  
    const handleSelectedCategory = async (selectedCategory) => {
      setCategory(selectedCategory);
      try{
        let response = await  fetch(url + selectedCategory + order);
        let data = await response.json();
  
        setProducts(data);
      } catch(e){
        console.log(e);
        setIsLoading(false);
        setErrorMessage(e.message);
      }
      
    }
      
    const handleSelectOrder = async(selectedOrder) => {
      try{
        setOrder(selectedOrder);
      let response = await fetch(url + category  + selectedOrder);
      let data = await response.json();
  
      setProducts(data);
      }catch(e){
        console.log(e);
        setIsLoading(false);
        setErrorMessage(e.message);
      }    
    }  
  
    const addingItemToCart =(productId, quantity) => {
        let newCart = {...cart};    
        const item = products.filter(p => p.id === productId);
        item[0].sum = item[0].price;
        item[0].quantity = quantity;
        item[0].inCart = true;
        setItemTitle(item[0].title);
        newCart.products = [...cart.products, item[0]];
      
      return newCart;
    }
  
   const handleAddToCart = (productId, quantity) => {  
      let updatedCart = addingItemToCart(productId, quantity);
      setCart(updatedCart);    
      setIsItemAdded();  
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
      try{
        let response = await  fetch('https://fakestoreapi.com/carts',{
        method:"POST",
        body:JSON.stringify(cart)
        })
      let data = await response.json();
  
      setOrderId(data._id);
      handleEmptyCard();   
      setIsCartSent();
      }catch(e){
        console.log(e);
        setIsLoading(false);
        setErrorMessage(e.message);
      }    
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
 
    return {isLoading, products, categories, cart, itemTitle, orderId, errorMessage, isItemAdded, 
            isCartSent, setIsItemAdded, setIsCartSent, handleAddToCart, handleSelectOrder, 
            handleSelectedCategory, handleEmptyCard, handleCheckOut, handleRemoveFromCard, 
            handleUpdateToCartQyt  }; 
}

export default useService;