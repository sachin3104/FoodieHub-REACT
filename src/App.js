import React,{useState} from "react";

import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./Store/CartProvider";

function App() {
  const [showModal,setShowModal]=useState(false);

  const hideCardHandler=()=>{
    setShowModal(false);
  }
  const showCardHandler=()=>{
    setShowModal(true);
  }

  return (
    <CartProvider>
      <Cart onConfirm={hideCardHandler} showModal={showModal}/>
      <Header onConfirm={showCardHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
