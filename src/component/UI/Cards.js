import classes from "../UI/card.module.css"



export const Cards =(props)=>{
    return(
        <div className={classes.card} >{props.children}</div>
    )
}