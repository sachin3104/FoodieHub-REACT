import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../Store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [showForm, setShowForm] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalPrice = `${cartCtx.totalPrice.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setShowForm(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onConfirm}>
        Close
      </button>
      {hasItems && !showForm && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onConfirm={props.onConfirm}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>₹{totalPrice}</span>
      </div>
      {showForm && <Checkout onCancel={props.onConfirm} />}
      {!showForm && modalActions}
    </Modal>
  );
};

export default Cart;
