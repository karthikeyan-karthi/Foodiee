import style from "../UI/input.module.css"
import React from "react";


export const Input= React.forwardRef((props,ref)=>{
    return(
        <div className={style.input}>
            <label  htmlFor={props.input.id} >{props.label}</label>
            <input ref={ref} {...props.input}/>
        </div>
    )

});