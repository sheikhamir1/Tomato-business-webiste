import React, { useState, useContext } from "react";
import { ProductContext } from "./ProductContect";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Home.css"; // Import the CSS file for custom styles
import { Link } from "react-router-dom";

const FoodCard = ({ id, image, name, price, stock }) => {
  const { CartItem, addToCart, removeFromCart } = useContext(ProductContext);
  const quantity = CartItem[id] || null;

  return (
    <Card className="shadow-sm h-100 food-card">
      <Card.Img
        variant="top"
        src={image}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex justify-content-between newClasses flex-column">
        <div className="d-flex justify-content-between newClasses mb-3">
          <Card.Text className="text-muted mb-0 customPrice  d-md-block">
            Price: ₹{price}
          </Card.Text>
          <Card.Text className="text-muted mb-0 customPrice  d-md-block">
            Stock : {stock}
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
            <span className="ml-2">{quantity}</span>
          </div>
        </div>
        <Card.Title className="text-center mb-3">{name}</Card.Title>
        <Link
          className="mt-auto MyBtn"
          to={`/cart`}
          style={{
            borderRadius: "12px",
            display: "flex",
            justifyContent: "center",
            textDecoration: "none",
          }}
        >
          <Button variant="primary" className="mt-auto MyBtn">
            Order Now
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default FoodCard;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
