import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import VerifyOTP from "./VerifyOTP_Comp";

const Signup_Comp = () => {
  const [showOtp, setShowOtp] = React.useState(false);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    setShowOtp(true);
    // reset();
  };

  return (
    <>
      {showOtp ? (
        <VerifyOTP />
      ) : (
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

            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter phone number"
                required
                name="phone"
                {...register("phone")}
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
              if already have an account? <Link to="/login_comp">Login</Link>
            </Form.Text>
          </Form>
        </div>
      )}
    </>
  );
};

export default Signup_Comp;
