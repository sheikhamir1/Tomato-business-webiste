import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import VerifyOTP from "./VerifyOTP_Comp";
import "./Login.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login_Comp = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    // reset();
  };

  return (
    <>
      <div className="MyForm">
        <Form className="setForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              name="email"
              {...register("email")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              name="password"
              {...register("password")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Agree to terms and conditions"
              required
              name="checkbox"
              {...register("checkbox")}
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
