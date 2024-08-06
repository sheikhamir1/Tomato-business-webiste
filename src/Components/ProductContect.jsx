import { createContext, useEffect, useState } from "react";
// import { foodProducts } from "./TestData";

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
    // console.log("cartitem", CartItem);
  }, [CartItem]);

  const FetchProduct = async () => {
    const jwtToken = localStorage.getItem("token");
    console.log("Retrieved token:", jwtToken); // Debug: Check the token value

    if (!jwtToken) {
      console.error("No token found. Please log in.");
      return; // Exit if no token is found
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/product/getAllProduct`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Retrieved token: again", localStorage.getItem("token")); // Debug: Check the token value

      if (!response.ok) {
        // Log response status and text for more debugging info
        const errorText = await response.text();
        console.error(
          `HTTP error! status: ${response.status}, text: ${errorText}`
        );
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      // setFoodProducts(data); // Uncomment and adjust as needed
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    FetchProduct();
  }, []);

  return (
    <ProductContext.Provider
      value={{ CartItem, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
