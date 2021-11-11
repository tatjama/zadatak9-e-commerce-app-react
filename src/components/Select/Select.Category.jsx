import React, {useRef} from 'react';

import { Typography, InputLabel } from '@material-ui/core';
import useStyles from './styles';

const SelectCategory = ({categories, onSelectCategory}) => {
    const classes = useStyles();
    const categorySelectRef = useRef();

    const handleChange = (event) => {
        event.preventDefault();
        const selectedCategory = categorySelectRef.current.value && `category/${categorySelectRef.current.value}`;
        console.log(selectedCategory);
        onSelectCategory(selectedCategory);
    }

    

    return(
            <form onChange = {handleChange}>
                <InputLabel htmlFor="category"> <Typography variant="body2"> Category:</Typography></InputLabel>
                <select className = {classes.selectForm} name="category"  ref = {categorySelectRef} >
                    <option className = {classes.text}  value = "" key = "all"> all </option>
                    {categories.map((category) => {
                        return (                            
                        <option className = {classes.text}  value = {category} key = {category}> {category}</option>
                        )
                        })
                    }
                    
                </select>
            </form>        
    )
}

export default SelectCategory;