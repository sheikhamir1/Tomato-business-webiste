import React, { useEffect, useState, useContext } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import "./Productcat.css"; // Create a separate CSS file for custom styling
import { useSearchParams } from "react-router-dom";
import { ProductContext } from "./ProductContect";
import { Link } from "react-router-dom";

function ProductsByCategory() {
  const { filteredProducts, addToCart, removeFromCart, CartItem } =
    useContext(ProductContext);
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    if (category) {
      // Fetch products by category
      fetch(
        `http://localhost:8080/api/product/getProductByProductCategory?category=${category}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setProducts(data.data); // Set fetched products in state
            // console.log("products", products);
          }
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [category]);

  return (
    <Container className="product-list-container">
      <h1 className="category-title text-center mb-4">
        Products in "{category}"
      </h1>
      {products.length > 0 ? (
        <Row className="gy-4">
          {products.map((product) => {
            const { id, imageUrl, productPrice, productStock, productName } =
              product;
            const quantity = CartItem[id] || 0; // Get the current quantity in the cart

            return (
              <Col key={id} xs={12} sm={6} md={4} lg={3}>
                <Card className="product-card shadow-sm">
                  <Card.Img
                    variant="top"
                    src={imageUrl}
                    alt={productName}
                    className="product-image"
                  />
                  <Card.Body>
                    <Card.Title className="product-title">
                      {productName}
                    </Card.Title>
                    <Card.Text>
                      <strong>Price:</strong> ₹{productPrice.toFixed(2)}
                    </Card.Text>
                    <Card.Text>
                      <strong>Stock:</strong> {productStock}
                    </Card.Text>

                    <div className="quantity-controls">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => addToCart(id)}
                      >
                        +
                      </Button>
                      {quantity >= 1 && (
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => removeFromCart(id)}
                          className="ml-2"
                        >
                          -
                        </Button>
                      )}
                      <span className="ml-2 quantity-value">{quantity}</span>
                    </div>

                    <Link className="custom-card-btn" to={`/cart`}>
                      {/* <Button variant="primary" disabled={quantity === 0}> */}
                      <Button variant="primary">Order Now</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <p className="text-center no-products">
          No products found for this category.
        </p>
      )}
    </Container>
  );
}

export default ProductsByCategory;
// import React from "react";
// import { Card, Row, Col, Container, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import "./Productcat.css"; // Use the same CSS file as before

// function ProductListByCategory({
//   category,
//   products,
//   CartItem,
//   addToCart,
//   removeFromCart,
// }) {
//   return (
//     <Container className="product-list-container">
//       <h1 className="category-title text-center mb-4">
//         Products in "{category}"
//       </h1>
//       {products.length > 0 ? (
//         <Row className="gy-4">
//           {products.map((product) => {
//             const { id, imageUrl, productPrice, productStock, productName } =
//               product;
//             const quantity = CartItem[id] || 0; // Get the current quantity in the cart

//             return (
//               <Col key={id} xs={12} sm={6} md={4} lg={3}>
//                 <Card className="product-card shadow-sm">
//                   <Card.Img
//                     variant="top"
//                     src={imageUrl}
//                     alt={productName}
//                     className="product-image"
//                   />
//                   <Card.Body>
//                     <Card.Title className="product-title">
//                       {productName}
//                     </Card.Title>
//                     <Card.Text>
//                       <strong>Price:</strong> ₹{productPrice.toFixed(2)}
//                     </Card.Text>
//                     <Card.Text>
//                       <strong>Stock:</strong> {productStock}
//                     </Card.Text>

//                     <div className="quantity-controls">
//                       <Button
//                         variant="outline-primary"
//                         size="sm"
//                         onClick={() => addToCart(id)}
//                       >
//                         +
//                       </Button>
//                       {quantity >= 1 && (
//                         <Button
//                           variant="outline-secondary"
//                           size="sm"
//                           onClick={() => removeFromCart(id)}
//                           className="ml-2"
//                         >
//                           -
//                         </Button>
//                       )}
//                       <span className="ml-2 quantity-value">{quantity}</span>
//                     </div>

//                     <Link className="custom-card-btn" to={`/cart`}>
//                       <Button variant="primary" disabled={quantity === 0}>
//                         Order Now
//                       </Button>
//                     </Link>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             );
//           })}
//         </Row>
//       ) : (
//         <p className="text-center no-products">
//           No products found for this category.
//         </p>
//       )}
//     </Container>
//   );
// }

// export default ProductListByCategory;
