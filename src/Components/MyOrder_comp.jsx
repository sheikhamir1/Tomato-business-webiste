import React, { useEffect, useState } from "react";
import "./MyOrder.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const username = localStorage.getItem("username");

  useEffect(() => {
    // Fetch data from API and update state
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/orders/getOrdersByUser?userName=${username}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const text = await response.text();
        const data = text ? JSON.parse(text) : null;

        // console.log("order fetched", data);

        if (data && data.success) {
          setOrders(data.data); // Store the fetched data in the state
        } else {
          throw new Error("Empty or unsuccessful response from server");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchOrders();
  }, [username]);

  return (
    <div className="my-orders">
      {orders.length > 0 ? (
        orders.map((order) => <OrderItem key={order.orderId} order={order} />)
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

function OrderItem({ order }) {
  return (
    <div className="order-item">
      <div className="order-header">
        <h3>Order ID: {order.orderId}</h3>
        <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
        <p>Status: {order.status}</p>
        <p>Total Amount: Rs {order.totalAmount.toFixed(2)}</p>
      </div>
      <div className="order-items">
        {order.orderItems.length > 0 ? (
          order.orderItems.map((item, index) => (
            <div key={index} className="order-product">
              <p>Product Name: {item.productName}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Unit Price: Rs {item.unitPrice.toFixed(2)}</p>
              <p>Total: Rs {(item.quantity * item.unitPrice).toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>No items in this order.</p>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
