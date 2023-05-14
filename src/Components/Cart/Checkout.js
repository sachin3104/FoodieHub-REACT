import { useRef, useState } from "react";

import classes from "./checkout.module.css";

const Checkout = (props) => {
  const [formInputValidity,setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameInputRef = useRef();
  const streetIntputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const isEmpty = (value) => value.trim() === "";
  const isFiveChar = (value) => value.trim().length === 5;

  const confirmHandler = (event) => {
    event.preventDefault();

    const entredName = nameInputRef.current.value;
    const entredStreet = streetIntputRef.current.value;
    const entredPostal = postalInputRef.current.value;
    const entredCity = cityInputRef.current.value;

    const entredNameIsValid = !isEmpty(entredName);
    const entredStreetIsValid = !isEmpty(entredStreet);
    const entredCityIsValid = !isEmpty(entredCity);
    const entredPostalIsValid = isFiveChar(entredPostal);

    setFormInputValidity({
        name: entredNameIsValid,
        street: entredStreetIsValid,
        city: entredCityIsValid,
        postal: entredPostalIsValid,
    })

    const formIsValid =
      entredNameIsValid &&
      entredStreetIsValid &&
      entredPostalIsValid &&
      entredCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
        name: entredName,
        street: entredStreet,
        city: entredCity,
        postal: entredPostal,
    });
  };

  const nameControlClass=`${classes.control} ${formInputValidity.name?" ":classes.invalid}`;
  const streetControlClass=`${classes.control} ${formInputValidity.street?" ":classes.invalid}`;
  const postalControlClass=`${classes.control} ${formInputValidity.postal?" ":classes.invalid}`;
  const cityControlClass=`${classes.control} ${formInputValidity.city?" ":classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClass}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name&&<p>Enter a valid name!</p>}
      </div>
      <div className={streetControlClass}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetIntputRef} />
        {!formInputValidity.street&&<p>Enter a valid street!</p>}
      </div>
      <div className={postalControlClass}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postal&&<p>Enter a valid postal!</p>}
      </div>
      <div className={cityControlClass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city&&<p>Enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
