import { useState, useEffect } from "react";
import { useLocation } from 'react-router';

const useFetchProduct = (cart, url) => {

    const location = useLocation();
    
    const id = location.pathname.split('/')[2]*1;
    
    const [ product, setProduct ] = useState({});
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isInCart, setIsInCart ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');    

    useEffect(() => {isProductInCart()})

    const isProductInCart = () => {
        let itemFoundIndex = cart.products.findIndex(product => product.id === id);
        if (itemFoundIndex !== -1){ setIsInCart(true) }
    }
    
    useEffect(() => {    
        fetchProduct(url,id);
    }, [url,id])
    
    const fetchProduct = async(url,id) => {
        setIsLoading(true)
        try{
            const response = await fetch(url+id);
            const data = await response.json();
        
            setProduct(data);
            setIsLoading(false);
        }catch(e){
            setIsLoading(false);
            setErrorMessage(e.message);
        }        
    }      
    
    return {product, isLoading, isInCart, errorMessage}
}

export default useFetchProduct;