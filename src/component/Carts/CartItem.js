import style from "../Carts/carditem.module.css";

export const CardItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={style["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={style.summary}>
          <span className={style.price}>{price}</span>
          <span className={style.amount}>x{props.amount}</span>
        </div>
      </div>
      <div className={style.actions}>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};
