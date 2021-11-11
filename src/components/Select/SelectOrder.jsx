import React, {useRef} from 'react';
import useStyles from './styles';
import {Typography, InputLabel} from '@material-ui/core';


const SelectOrder = ({onSelectOrder, onSelectCategory}) => {
    const classes = useStyles();
    const orderSelectRef = useRef();

    const handleChange = (event) => {
        event.preventDefault();
        const selectedOrder = `?sort=${orderSelectRef.current.value}`;
        
        onSelectOrder(selectedOrder);
    }

    return(
        <form onChange = {handleChange}>
                <InputLabel htmlFor="order">
                     <Typography variant="body2"> Order:</Typography>
                </InputLabel>
                <select className = { classes.selectForm } name="order"  ref = {orderSelectRef} >
                    {['asc', 'desc'].map((order) => {
                        return (                            
                        <option className = {classes.text} value = {order} key = {order}> {order} </option>
                        )
                        })
                    }                    
                </select>
            </form>
    )
}

export default SelectOrder;