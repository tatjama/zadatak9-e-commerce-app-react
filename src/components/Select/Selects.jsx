import React from 'react';
import SelectOrder from './SelectOrder';
import SelectCategory from './Select.Category';

import { Typography} from '@material-ui/core';
import useStyles from './styles';

const Selects = ({categories, onSelectCategory, onSelectOrder}) => {
    const classes = useStyles();

    return(
        <section className={classes.container}>
            <Typography variant="h6">Filters:</Typography>
            <div className={classes.selects}>
                <SelectCategory categories = {categories} onSelectCategory = {onSelectCategory}/>
                <SelectOrder onSelectOrder = {onSelectOrder}/>
            </div>
        </section>

    )
}

export default Selects;