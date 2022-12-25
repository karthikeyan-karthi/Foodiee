import {Fragment,useState} from "react"
import { Cart } from "./component/Carts/Cart";
import { Header } from "./component/Layouts/Header";
import { Meals } from "./component/Meals/Meals";
import { ContextProvider } from "./contextstore/ContextProvider";



function App() {
  const [cartShow,setCartShow] =useState(false);

const showCartHandler=()=>{

  setCartShow(true)

}

const hideCartHandler=()=>{
  setCartShow(false)
}

  return (
    <ContextProvider>
      {cartShow && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main><Meals />
      </main>
    </ContextProvider>
   
  );
}

export default App;
