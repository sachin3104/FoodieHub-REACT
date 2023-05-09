import React,{useContext} from "react";

import MealItemForm from "./MealItemForm";
import classes from './MealsItem.module.css';
import CartContext from "../../../Store/cart-context";

const MealsItem=(props)=>{
    const ctx=useContext(CartContext);
    const price=`₹${props.price}`;

    const addToCartHandler=(amount)=>{
        ctx.addItem({
            id:props.id,
            name:props.name,
            amount:amount,
            price:props.price
        })
    }

    
    return(
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm  onAddToCart={addToCartHandler}/>
            </div>
        </li>
    )
}

export default MealsItem;