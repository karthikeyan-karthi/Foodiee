import { useRef, useState } from "react";
import { Input } from "../../UI/Input";
import style from "../MealsItem/mealitemform.module.css";

export const MealItemForm = (props) => {
  const [amountisValid, setamountisValid] = useState(false);
  const amountaddref = useRef();

  const SubmitHandler = (e) => {
    e.preventDefault();

    const enterAmount = amountaddref.current.value;
    const enteredAmountNumber = +enterAmount;
    if (
      enterAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      return setamountisValid(true);
    } 
    props.onAddAmount(enteredAmountNumber);
  setamountisValid(false)
  };

  return (
    <form onSubmit={SubmitHandler} className={style.form}>
      <Input
             ref={ amountaddref }
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          // min: "1",
          // max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />

      <button >+ Add</button>
      { amountisValid && <p >Please enter a valid amount</p>}



          

    </form>
  );
};
