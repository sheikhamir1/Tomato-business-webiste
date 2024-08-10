import React, { useContext } from "react";
import { ProductContext } from "./ProductContect";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./productlist.css"; // Import the CSS file

function ProductList() {
  const { filteredProducts, addToCart, removeFromCart, CartItem } =
    useContext(ProductContext);
  //   console.log("filteredProducts", filteredProducts);

  return (
    <div className="product-list">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => {
          const { id, imageUrl, productPrice, productStock, productName } =
            product;
          const quantity = CartItem[id] || 0; // Get the current quantity in cart

          return (
            <div key={id} className="custom-card">
              <img
                src={imageUrl}
                alt={productName}
                className="custom-card-img"
              />
              <div className="custom-card-body">
                <h5 className="custom-card-title">{productName}</h5>
                <p className="custom-card-text">Price: ₹{productPrice}</p>
                <p className="custom-card-text">Stock: {productStock}</p>
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
                  <span className="ml-2">{quantity}</span>
                </div>
                <Link className="custom-card-btn" to={`/cart`}>
                  <Button variant="primary">Order Now</Button>
                </Link>
              </div>
            </div>
          );
        })
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}

export default ProductList;
