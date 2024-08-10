import React, { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import VerifyOTP from "./VerifyOTP_Comp";
import "./Login.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ProductContext } from "./ProductContect";

const Login_Comp = () => {
  const { setUserDetails } = useContext(ProductContext);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    setUserDetails(data);
    // console.log("userDetails", userDetails);

    // console.log(data);

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
      console.log("login result", result);
      localStorage.setItem("token", result.jwtToken);
      window.location.replace("/profile");
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
