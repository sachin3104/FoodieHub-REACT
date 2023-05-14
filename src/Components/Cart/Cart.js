import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../Store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

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

  const submitDataHandler = (userData) => {
    setIsSubmiting(true);
    fetch(
      "https://react-food-app-backend-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmiting(false);
    setIsSubmited(true);
    cartCtx.clearCart();
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

  const modalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>₹{totalPrice}</span>
      </div>
      {showForm && (
        <Checkout onConfirm={submitDataHandler} onCancel={props.onConfirm} />
      )}
      {!showForm && modalActions}
    </React.Fragment>
  );

  const isSubmitingModalData = <p>Placing your Order...</p>;
  const isSubmitedModalData = (
    <React.Fragment>
      <p>Your Order is Placed. Thank You!</p>
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.onConfirm}>
        Close
      </button>
    </div>
    </React.Fragment>
  );

  return (
    <Modal onConfirm={props.onConfirm}>
      {!isSubmiting && !isSubmited && modalContent}
      {isSubmiting && isSubmitingModalData}
      {!isSubmiting && isSubmited && isSubmitedModalData}
    </Modal>
  );
};

export default Cart;
