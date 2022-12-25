import React, { useContext, useState } from "react";
import { CartContext } from "../../contextstore/CartContext";
import style from "../Carts/cart.module.css";
import { Model } from "../UI/Model";
import { CardItem } from "./CartItem";
import CustomerDetails from "./CustomerDetails";

export const Cart = (props) => {
const [isOrder,setIsOrder]= useState(false)
const [isSubmitting,setIsSubmitting]=useState(false)
const [isSubmit,setisSubmit]=useState(false)
const cartcxt=useContext(CartContext)

const totalAmount=`$${cartcxt.totalAmount.toFixed(2)}`;
const hasItem =cartcxt.items.length>0;

const CartItemRemoveHandler=(id)=>{
  cartcxt.removeitem(id)
}

const cartItemAddHandler=(item)=>{
  cartcxt.additem({...item,amount:1})
}


const orderHandler=(event)=>{
  event.preventDefault();
  setIsOrder(true)
}

const OrderSumbitHandler= async(userdata)=>{
setIsSubmitting(true);
await fetch('https://reacthttp-2d450-default-rtdb.firebaseio.com/order.json',{
method:'POST',
body:JSON.stringify({
   user:userdata,
   orderItem:cartcxt.items
})
})
setIsSubmitting(false)
setisSubmit(true)

cartcxt.clear();

}

  const cartItems = (
    <ul className={style["cart-items"]}>
    {cartcxt.items.map((item)=>(<CardItem 
    key={item.id}
    name={item.name}
    amount={item.amount}
    price={item.price}
    onRemove={CartItemRemoveHandler.bind(null,item.id)}
    onAdd={cartItemAddHandler.bind(null,item)}
    />
      
    ))}
    </ul>
  );

const modalAction =
  <div className={style.actions}>
        <button onClick={props.onClose} className={style["button--alt"]}>
          Close
        </button>
        {hasItem && <button className={style.button} onClick={orderHandler}>Order</button>}
      </div>

const cartModalContent=(
  <React.Fragment>
 {cartItems}
      <div className={style.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
        {isOrder &&  <CustomerDetails onconfirm={OrderSumbitHandler} onCancel={props.onClose} />}
        {!isOrder && modalAction}     

  </React.Fragment>
)

const isSubmittingModalContent= (<div className={style.submitting}>
<p>Sending order data.....</p>
<div className={style.spinner}></div>
</div>)

const didSubmitModalContent=(
  <React.Fragment>
     <p>Successfully sent the order!.....</p>
     <div className={style.actions}>
        <button onClick={props.onClose} className={style["button--alt"]}>
          Close
        </button>
        </div>
  </React.Fragment>
)
  return (
    <Model onClose={props.onClose}>
     {!isSubmitting && !isSubmit && cartModalContent}
     {isSubmitting && isSubmittingModalContent }
     {!isSubmitting && isSubmit && didSubmitModalContent}
    </Model>
  );
};
