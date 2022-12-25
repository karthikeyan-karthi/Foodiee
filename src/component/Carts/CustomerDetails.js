import React,{useRef, useState} from 'react'
import style from "../Carts/customerdetails.module.css"



const isEmpty=value=> value.trim() == '';
const isFiveCharater=value=> value.trim().length === 6;

const CustomerDetails = (props) => {
const [formInputValidity,setformInputValidity]=useState({
  name:true,
  street:true,
  city:true,
  postal:true,
})


const nameInputValue =useRef();
const streetInputValue =useRef();
const postalInputValue =useRef();
const cityInputValue =useRef();

const confirmHandler=(event)=>{
    event.preventDefault();

    const enteredname=nameInputValue.current.value;
    const street=streetInputValue.current.value;
    const postal=postalInputValue.current.value;
    const city=cityInputValue.current.value;
    

    const nameisValid = !isEmpty(enteredname);
    const streetisValid = !isEmpty(street);
    const postalisVaild = isFiveCharater(postal);
    const cityisValid = !isEmpty(city)
        
    setformInputValidity({
      name:nameisValid,
      street:streetisValid,
      postal:postalisVaild,
      city:cityisValid

    })

    const formisValid=nameisValid && streetisValid && postalisVaild && cityisValid;

    if(!formisValid){
      return;
    }
 
    props.onconfirm(
      {
        name:enteredname,
        street:street,
        postalcode:postal,
        city:city
      }
    )
}

const nameControlClass = `${style.control} ${formInputValidity.name ? '' : style.invalid}`
const streetControlClass = `${style.control} ${formInputValidity.street? '' : style.invalid}`
const postalControlClass = `${style.control} ${formInputValidity.postal ? '' : style.invalid}`
const cityControlClass = `${style.control} ${formInputValidity.city ? '' : style.invalid}`

return(
      <form className={style.form}onSubmit={confirmHandler} >
        <div className={nameControlClass}>
          <label htmlFor='name'>Your Name</label>
          <input ref={nameInputValue} type='text' id='name' />
          {!formInputValidity && <p className={style.invalid} >Enter the name....</p>}
        </div>
        <div className={streetControlClass}>
          <label htmlFor='street'>Street</label>
          <input ref={streetInputValue} type='text' id='street' />
          {!formInputValidity && <p className={style.invalid} >Enter the street....</p>}

        </div>
        <div className={postalControlClass}>
          <label htmlFor='postal'>Postal Code</label>
          <input ref={postalInputValue} type='text' id='postal' />
          {!formInputValidity && <p className={style.invalid} >Enter the correct postalcode....</p>}

        </div>
        <div className={cityControlClass}>
          <label htmlFor='city'>City</label>
          <input ref={cityInputValue} type='text' id='city' />
          {!formInputValidity && <p className={style.invalid} >Enter the city....</p>}

        </div>
        <div className={style.actions}>
          <button type='button' onClick={props.onCancel}>
            Cancel
          </button>
          <button className={style.submit}>Confirm</button>
        </div>
      </form>

  
);  
}

export default CustomerDetails
