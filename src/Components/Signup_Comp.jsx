import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import VerifyOTP from "./VerifyOTP_Comp";

const Signup_Comp = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState("");

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    try {
      // console.log(data);

      const response = await fetch(`http://localhost:8080/registerNewUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Directly pass the `data` object, not wrapped in another object
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setEmail(result.userEmail);
      console.log("signup result", result);
      console.log("email", email);

      setShowOtp(true);
      // reset();
    } catch (error) {
      console.error("Error during signup:", error);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };
  useEffect(() => {
    // console.log("Email state updated:", email);
  }, [email]);
  return (
    <>
      {showOtp ? (
        <VerifyOTP email={email} />
      ) : (
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

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                name="userEmail"
                {...register("userEmail")}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>user first name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user first name"
                required
                name="userFirstName"
                {...register("userFirstName")}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>user last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user last name"
                required
                name="userLastName"
                {...register("userLastName")}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                required
                name="userPassword"
                {...register("userPassword")}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>mobile</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter mobile"
                required
                name="userMobileNumber"
                {...register("userMobileNumber")}
              />
            </Form.Group>

            <Form.Group className="mb-3 hidethis" controlId="formBasicText">
              <Form.Label>role</Form.Label>
              <Form.Control
                type="hidden"
                required
                name="role"
                value="VENDOR"
                {...register("role")}
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
              if already have an account? <Link to="/login_comp">Login</Link>
            </Form.Text>
          </Form>
        </div>
      )}
    </>
  );
};

export default Signup_Comp;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
