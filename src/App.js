import React,{useState} from "react";

import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";

function App() {
  const [showModal,setShowModal]=useState(false);
  const onConfirmHandler=()=>{
    if(showModal){
      setShowModal(false);
    }else{
      setShowModal(true);
    }
  }
  return (
    <React.Fragment>
      <Cart onConfirm={onConfirmHandler} showModal={showModal}/>
      <Header onConfirm={onConfirmHandler}/>
      <main>
        <Meals/>
      </main>
    </React.Fragment>
  );
}

export default App;
