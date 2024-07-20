import { createContext, useEffect, useState } from "react";
import { foodProducts } from "./TestData";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [CartItem, setCartItem] = useState({});

  const addToCart = (ItemId) => {
    if (!CartItem[ItemId]) {
      setCartItem((prev) => ({ ...prev, [ItemId]: 1 }));
      console.log("this is working add to cart if block");
    } else {
      setCartItem((prev) => ({ ...prev, [ItemId]: prev[ItemId] + 1 }));
      console.log("this is working add to cart else block");
    }
  };

  const removeFromCart = (ItemId) => {
    setCartItem((prev) => ({ ...prev, [ItemId]: prev[ItemId] - 1 }));
    console.log("this is working remove from cart");
  };

  const clearCart = (ItemId) => {
    setCartItem((prev) => ({ ...prev, [ItemId]: 0 }));
    console.log("this is working clear cart");
  };

  useEffect(() => {
    console.log("cartitem", CartItem);
  }, [CartItem]);

  return (
    <ProductContext.Provider
      value={{ foodProducts, CartItem, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
