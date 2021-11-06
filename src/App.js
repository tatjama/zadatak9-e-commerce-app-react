import React, { useState, useEffect } from 'react';

import { Products, Navbar} from './components';

const App = () => {

  const [products, setProducts] = useState([]);

  const fetchProducts = async() => {
    let result = await fetch('https://fakestoreapi.com/products/');
    let data = await result.json();

    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, [])
 
  return (
    <div>
      <Navbar/>
      <Products products = {products}/>
    </div>
  )
}

export default App;