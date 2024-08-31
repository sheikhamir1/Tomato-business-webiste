import React, { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import VerifyOTP from "./VerifyOTP_Comp";
import "./Login.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ProductContext } from "./ProductContect";

const Login_Comp = () => {
  const { setUserDetails, setFetchProfile } = useContext(ProductContext);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    // Log the user details for debugging
    console.log("User data submitted:", data);

    try {
      const response = await fetch(`http://localhost:8080/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Login result:", result);

      // Store token and username in localStorage
      // localStorage.setItem("token", result.jwtToken);
      localStorage.setItem("username", data.userName); // Storing username
      localStorage.setItem("token", result.jwtToken);
      localStorage.setItem("loginTime", Date.now());

      // Optional: Update context or state
      setUserDetails(data);

      // Optionally navigate to profile page
      window.location.replace("/profile");

      // Reset form after successful login
      reset();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <div className="MyForm">
        <Form className="setForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter userName"
              required
              name="userName"
              {...register("userName")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              name="userPassword"
              {...register("userPassword")}
            />
          </Form.Group>

          <Button
            // variant="primary"
            type="submit"
            className="btnSetup"
          >
            Submit
          </Button>
          <Form.Text className="setTextInLogin">
            Don`t have an account? <Link to="/signup">Sign Up</Link>
          </Form.Text>
        </Form>
      </div>
    </>
  );
};

export default Login_Comp;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
