import { createContext, useEffect, useState } from "react";
// import { foodProducts } from "./TestData";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [CartItem, setCartItem] = useState({});

  const [getAllProducts, setGetAllProducts] = useState([]);

  // const addToCart = (ItemId) => {
  //   if (!CartItem[ItemId]) {
  //     setCartItem((prev) => ({ ...prev, [ItemId]: 1 }));
  //     console.log("this is working add to cart if block");
  //   } else {
  //     setCartItem((prev) => ({ ...prev, [ItemId]: prev[ItemId] + 1 }));
  //     console.log("this is working add to cart else block");
  //   }
  // };

  // const removeFromCart = (ItemId) => {
  //   setCartItem((prev) => ({ ...prev, [ItemId]: prev[ItemId] - 1 }));
  //   console.log("this is working remove from cart");
  // };

  // const clearCart = (ItemId) => {
  //   setCartItem((prev) => ({ ...prev, [ItemId]: 0 }));
  //   console.log("this is working clear cart");
  // };

  const addToCart = (ItemId) => {
    const itemId = String(ItemId); // Convert ItemId to string
    setCartItem((prev) => {
      const newCart = { ...prev };
      newCart[itemId] = (newCart[itemId] || 0) + 1;
      console.log("Updated CartItem after add:", newCart);
      return newCart;
    });
  };

  const removeFromCart = (ItemId) => {
    const itemId = String(ItemId); // Convert ItemId to string
    setCartItem((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      console.log("Updated CartItem after remove:", newCart);
      return newCart;
    });
  };

  const clearCart = (ItemId) => {
    const itemId = String(ItemId); // Convert ItemId to string
    setCartItem((prev) => {
      const newCart = { ...prev };
      delete newCart[itemId];
      console.log("Updated CartItem after clear:", newCart);
      return newCart;
    });
  };

  useEffect(() => {
    // console.log("cartitem", CartItem);
  }, [CartItem]);

  const FetchProduct = async () => {
    if (!localStorage.getItem("token")) {
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

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `HTTP error! status: ${response.status}, text: ${errorText}`
        );
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);

      // Set the products array from the response
      setGetAllProducts(data.data);
      console.log("setAllProducts", data.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    FetchProduct();
  }, []);

  return (
    <ProductContext.Provider
      value={{ CartItem, addToCart, removeFromCart, clearCart, getAllProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
