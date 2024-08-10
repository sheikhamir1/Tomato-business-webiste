// import { createContext, useEffect, useState } from "react";
// // import { foodProducts } from "./TestData";

// const ProductContext = createContext();

// const ProductProvider = ({ children }) => {
//   const [CartItem, setCartItem] = useState({});
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const [getAllProducts, setGetAllProducts] = useState([]);
//   const [userDetails, setUserDetails] = useState({});
//   // console.log("userDetails", userDetails);

//   const addToCart = (ItemId) => {
//     const itemId = String(ItemId); // Convert ItemId to string
//     setCartItem((prev) => {
//       const newCart = { ...prev };
//       newCart[itemId] = (newCart[itemId] || 0) + 1;
//       // console.log("Updated CartItem after add:", newCart);
//       return newCart;
//     });
//   };

//   const removeFromCart = (ItemId) => {
//     const itemId = String(ItemId); // Convert ItemId to string
//     setCartItem((prev) => {
//       const newCart = { ...prev };
//       if (newCart[itemId] > 1) {
//         newCart[itemId] -= 1;
//       } else {
//         delete newCart[itemId];
//       }
//       // console.log("Updated CartItem after remove:", newCart);
//       return newCart;
//     });
//   };

//   const clearCart = (ItemId) => {
//     const itemId = String(ItemId); // Convert ItemId to string
//     setCartItem((prev) => {
//       const newCart = { ...prev };
//       delete newCart[itemId];
//       // console.log("Updated CartItem after clear:", newCart);
//       return newCart;
//     });
//   };

//   useEffect(() => {
//     // console.log("cartitem", CartItem);
//   }, [CartItem]);

//   const clearAllCart = () => {
//     setCartItem({});
//   };

//   const FetchProduct = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/product/getAllProduct`,
//         {
//           method: "GET",
//           headers: {
//             // Authorization: `Bearer ${localStorage.getItem("token")}`,
//             // Authorization: `Bearer ${jwtToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(
//           `HTTP error! status: ${response.status}, text: ${errorText}`
//         );
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       // console.log("Fetched data:", data);

//       // Set the products array from the response
//       setGetAllProducts(data.data);
//       setFilteredProducts(data.data);
//       console.log("setAllProducts", data.data);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   };

//   useEffect(() => {
//     FetchProduct();
//   }, []);

//   const filterProducts = (query) => {
//     const lowercasedQuery = query.toLowerCase();
//     const filtered = getAllProducts.filter((product) =>
//       product.productName.toLowerCase().includes(lowercasedQuery)
//     );
//     setFilteredProducts(filtered);
//   };

//   // const productCategory = async () => {
//   //   try {
//   //     const response = await fetch(
//   //       `http://localhost:8080/api/productCategory/getAllProductCategory`,
//   //       {
//   //         method: "GET",
//   //         headers: {
//   //           Authorization: `Bearer ${localStorage.getItem("token")}`,
//   //           "Content-Type": "application/json",
//   //         },
//   //       }
//   //     );

//   //     if (!response.ok) {
//   //       // Handle HTTP errors
//   //       throw new Error(`HTTP error! status: ${response.status}`);
//   //     }

//   //     const data = await response.json(); // Parse the JSON data from the response
//   //     console.log("response", data);
//   //   } catch (error) {
//   //     console.error("Error:", error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   // productCategory();
//   // }, []);

//   return (
//     <ProductContext.Provider
//       value={{
//         CartItem,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         getAllProducts,
//         userDetails,
//         setUserDetails,
//         clearAllCart,
//         filteredProducts,
//         filterProducts,
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export { ProductContext, ProductProvider };
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
