import React, { useContext } from "react";
import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
import "./CartComponents.css";
import { ProductContext } from "./ProductContect";

const Cart_Comp = () => {
  const {
    CartItem,
    addToCart,
    removeFromCart,
    clearCart,
    getAllProducts,
    clearAllCart,
  } = useContext(ProductContext);

  // Calculate subtotal and total
  const subtotal = Object.keys(CartItem).reduce((acc, itemId) => {
    const item = getAllProducts.find(
      (product) => product.id === parseInt(itemId)
    );
    if (item) {
      return acc + item.productPrice * CartItem[itemId];
    }
    return acc;
  }, 0);

  const total = subtotal;

  const userId = localStorage.getItem("username");
  // console.log("userId", userId);

  const handleCheckout = async () => {
    const orderItems = Object.keys(CartItem).map((itemId) => ({
      productId: itemId,
      quantity: CartItem[itemId],
    }));

    const orderData = {
      userId: userId,
      orderItems: orderItems,
    };
    // console.log("Order data:", orderData);

    try {
      const response = await fetch("http://localhost:8080/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        // console.log("Order placed successfully:", result);
        alert("Order placed successfully!");
        // window.location.reload();
        clearAllCart(); // Clear the cart after successful order placement
      } else {
        console.error("Failed to place order:", response.statusText);
        alert("Failed , please login to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order.");
    }
  };

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
                          <td>₹{item.productPrice.toFixed(2)}</td>
                          <td>{item.productStock}</td>
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
                          <td>₹{(item.productPrice * quantity).toFixed(2)}</td>
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
                    return null;
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
                            <Card.Text>
                              Price: ₹{item.productPrice.toFixed(2)}
                            </Card.Text>
                            <Card.Text>Stock: {item.productStock}</Card.Text>
                            <Card.Text>Quantity: {quantity}</Card.Text>
                            <Card.Text>
                              Total: ₹
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
                return null;
              })}
            </div>
          </Col>
          <Col md={4} className="mt-5">
            <div className="border p-3">
              <h5>Cart Totals</h5>
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong>₹{total.toFixed(2)}</strong>
              </div>
              <Button
                variant="primary"
                className="mt-3 w-100"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cart_Comp;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
