import React from "react";

import mealsImg from "../../Assets/Img/meals.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <button>cart</button>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="Dining-table-with-good-food" />
      </div>
    </React.Fragment>
  );
};

export default Header;
