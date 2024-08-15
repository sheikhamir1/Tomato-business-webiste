import { createContext, useEffect, useState, useCallback } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [CartItem, setCartItem] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [getAllProducts, setGetAllProducts] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  const addToCart = (ItemId) => {
    const itemId = String(ItemId);
    setCartItem((prev) => {
      const newCart = { ...prev };
      newCart[itemId] = (newCart[itemId] || 0) + 1;
      return newCart;
    });
  };

  const removeFromCart = (ItemId) => {
    const itemId = String(ItemId);
    setCartItem((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const clearCart = (ItemId) => {
    const itemId = String(ItemId);
    setCartItem((prev) => {
      const newCart = { ...prev };
      delete newCart[itemId];
      return newCart;
    });
  };

  const clearAllCart = () => {
    setCartItem({});
  };

  const FetchProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/product/getAllProduct`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, text: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Fetch data:", data);

      setGetAllProducts(data.data);
      setFilteredProducts(data.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    FetchProduct();
  }, []);

  // Memoize filterProducts to prevent unnecessary re-renders
  const filterProducts = useCallback(
    (query) => {
      const lowercasedQuery = query.toLowerCase();
      const filtered = getAllProducts.filter((product) =>
        product.productName.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredProducts(filtered);
    },
    [getAllProducts]
  );

  return (
    <ProductContext.Provider
      value={{
        CartItem,
        addToCart,
        removeFromCart,
        clearCart,
        getAllProducts,
        userDetails,
        setUserDetails,
        clearAllCart,
        filteredProducts,
        filterProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
