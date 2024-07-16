import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const getLocalCartData = () => {
  let newCartData = localStorage.getItem("apnaCart");

  if (newCartData == []) {
    return [];
  } else {
    return JSON.parse(newCartData);
  }
};

const initialState = {
  cart: getLocalCartData(),
  total_item: "",
  total_amount: "",
  shipping_fee: 50000,
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  // increament and decreament the product

  const setDecrease = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  };

  const setIncrease = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  };

  // to remove the individual items in the cart

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  // to clear cart item

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // to add the data in local storage

  useEffect(() => {
    // dispatch({type:"CART_TOTAL_ITEM"})
    // dispatch({type:"CART_PRICE_ITEM"})
    dispatch({ type: "CART_TOTAL_ITEM_PRICE" });
    localStorage.setItem("apnaCart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setDecrease,
        setIncrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartContextProvider, useCartContext };
