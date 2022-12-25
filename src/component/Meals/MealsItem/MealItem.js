import { useContext } from "react";
import { CartContext } from "../../../contextstore/CartContext";
import style from "../MealsItem/Mealitem.module.css";
import { MealItemForm } from "./MealItemForm";

export const MealItem = (props) => {
  const cartcxt = useContext(CartContext);
  const Price = `$${props.price.toFixed(2)}`;
  const addAmountHandler = (amount) => {
    cartcxt.additem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });

  };
  return (
    <li className={style.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={style.description}>{props.description}</div>
        <div className={style.price}>{Price}</div>
      </div>

      <div>
        <MealItemForm id={props.id} onAddAmount={addAmountHandler} />
      </div>
    </li>
  );
};
