import React, { useReducer } from "react";
import { CartContext } from "./CartContext";

const defaultCartItem = {
  items: [],
  totalAmount: 0,
};

const cartItemHandler = (state, action) => {
  if (action.type === "ADD") {
    const updateTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updateItems;
    if (existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updateItems = [...state.items];
         updateItems[existingCartItemIndex] = updateItem;

        } else {
      updateItems = state.items.concat(action.item);
    }
    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  }

  if (action.type === "Remove") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];

    const updateTotalAmount = state.totalAmount - existingItem.price;
    let updateItems;
    if (existingItem.amount === 1) {
      updateItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updateItem = { ...existingItem, amount: existingItem.amount - 1 };
      updateItems = [...state.items];
      updateItems[existingCartItemIndex] = updateItem;
    }
    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  }

  if (action.type === "clear") {
    return defaultCartItem;
  }
  return defaultCartItem;
};
export const ContextProvider = (props) => {
  const [cartState, dispatch] = useReducer(cartItemHandler, defaultCartItem);

  const additemHandler = (item) => {
    dispatch({ type: "ADD", item: item });
  };

  const removeItemHandler = (id) => {
    dispatch({ type: "Remove", id: id });
  };

  const clearCartHandler = () => {
    dispatch({ type: "clear" });
  };

  const cartcontext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    additem: additemHandler,
    removeitem: removeItemHandler,
    clear: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartcontext}>
      {props.children}
    </CartContext.Provider>
  );
};
