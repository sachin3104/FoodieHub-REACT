import React from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {[{ id: "c1", name: "Shusi", amount: "3", price: "34.56" }].map(
        (item) => {
          return(<li>{item.name}</li>);
        }
      )}
    </ul>
  );
  const showModal=props.showModal;
  return (
    <React.Fragment>
    {!showModal&&(
        <Modal onConfirm={props.onConfirm}>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>56.78</span>
          </div>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onConfirm}>Close</button>
            <button className={classes.button}>Order</button>
          </div>
        </Modal>
    )}
    </React.Fragment>
  );
};

export default Cart;
