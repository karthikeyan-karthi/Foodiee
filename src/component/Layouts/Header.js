import {Fragment} from "react"
import style from "../Layouts/header.module.css"
import img from"../../assest/pexels-pixabay-461198.jpg"
import { HeaderCartbutton } from "./HeaderCartButton"

export const Header=(props)=>{
    return(
        <Fragment>
    <header className={style.header}>
     <h1>Foodiee</h1>
     <HeaderCartbutton onClick={props.onShowCart} />
    </header>
<div className={style.img}><img  src={img} alt="Collection of Food Img"  /></div>
</Fragment>
    )
}