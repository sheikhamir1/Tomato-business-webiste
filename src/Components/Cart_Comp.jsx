import React, { useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  Card,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./CartComponents.css";
import { ProductContext } from "./ProductContect";

const Cart_Comp = () => {
  const { CartItem, addToCart, removeFromCart, clearCart, getAllProducts } =
    useContext(ProductContext);

  // React Hook Form setup
  const { register, handleSubmit } = useForm();

  const subtotal = Object.keys(CartItem).reduce((acc, itemId) => {
    const item = getAllProducts.find(
      (product) => product.id === parseInt(itemId)
    );
    if (item) {
      return acc + item.productPrice * CartItem[itemId];
    }
    return acc; // If item is not found, return the accumulator unchanged
  }, 0);

  // Example delivery fee calculation (you can replace it with your own logic)
  const deliveryFee = 5.0;
  // Total amount
  const total = subtotal + deliveryFee;

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col md={8} style={{ overflow: "overlay" }}>
            <div className="table-responsive">
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>Items</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {getAllProducts.map((item) => {
                    const quantity = CartItem[item.id] || 0;
                    if (quantity > 0) {
                      return (
                        <tr key={item.id}>
                          <td>
                            <img
                              src={item.imageUrl}
                              alt={item.productName}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                            />
                          </td>
                          <td>{item.productName}</td>
                          <td>${item.productPrice}</td>
                          <td>${item.productStock}</td>
                          <td>
                            <div className="d-flex newClassAdd">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                              >
                                -
                              </Button>
                              <span className="mx-2">{quantity}</span>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => addToCart(item.id)}
                              >
                                +
                              </Button>
                            </div>
                          </td>
                          <td>${(item.productPrice * quantity).toFixed(2)}</td>
                          <td>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => clearCart(item.id)}
                            >
                              x
                            </Button>
                          </td>
                        </tr>
                      );
                    }
                    return null; // Only return rows for items that are in the cart
                  })}
                </tbody>
              </Table>
            </div>
            <div className="card-container hideClass">
              {getAllProducts.map((item) => {
                const quantity = CartItem[item.id] || 0;
                if (quantity > 0) {
                  return (
                    <Card key={item.id}>
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                          <img
                            src={item.imageUrl}
                            alt={item.productName}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                            }}
                          />
                          <div>
                            <Card.Title>{item.productName}</Card.Title>
                            <Card.Text>Price: ${item.productPrice}</Card.Text>
                            <Card.Text>Stock: ${item.productStock}</Card.Text>
                            <Card.Text>Quantity: {quantity}</Card.Text>
                            <Card.Text>
                              Total: $
                              {(item.productPrice * quantity).toFixed(2)}
                            </Card.Text>
                          </div>
                        </div>
                        <div className="d-flex newClassAdd justify-content-between mt-2">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            -
                          </Button>
                          <span className="mx-2">{quantity}</span>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => addToCart(item.id)}
                          >
                            +
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => clearCart(item.id)}
                          >
                            x
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  );
                }
                return null; // Only return cards for items that are in the cart
              })}
            </div>
          </Col>
          <Col md={4} className="mt-5">
            <div className="border p-3">
              <h5>Cart Totals</h5>
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <Button variant="primary" className="mt-3 w-100">
                Proceed to Checkout
              </Button>
            </div>
            <Form className="mt-4" onSubmit={handleSubmit}>
              <Form.Group controlId="promoCode">
                <Form.Label>Promo Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter promo code"
                  name="promoCode"
                />
                <Button variant="dark" className="mt-2" type="submit">
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cart_Comp;
