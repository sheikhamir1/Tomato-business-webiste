import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./VerifyOTP.css";

function OTPVerification({ email }) {
  // console.log("email", email);

  const [verificationResult, setVerificationResult] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    console.log("OTP code", data);
    const otpCode = data.otpCode;
    reset();

    try {
      const response = await fetch(
        `http://localhost:8080/api/otp/verify?email=${email}&otpCode=${otpCode}`,
        {
          method: "POST",
        }
      );

      // Check if response is okay (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if the response is JSON or plain text
      const contentType = response.headers.get("Content-Type");
      let result;

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        // Handle plain text response
        const text = await response.text();
        console.log("Non-JSON response:", text);
        result = {
          success: text.toLowerCase().includes("successfully"),
          message: text,
        };
      }

      setVerificationResult(result); // Save the result to state
      console.log("OTP verification successful:", result);
      window.location.replace("/login_comp");

      // Handle further actions after successful verification
    } catch (error) {
      console.error("Error during OTP verification:", error);
      setVerificationResult({
        success: false,
        message: "OTP verification failed. Please try again.",
      });
    }
  };

  return (
    <div className="otp-container d-flex justify-content-center align-items-center vh-100">
      <div className="otp-card p-4 shadow-lg rounded border-light bg-white">
        <h2 className="text-center mb-4 text-primary h2Setup">
          Verify Your OTP
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="otpInput" className="form-label">
              Enter OTP
            </label>
            <input
              type="text"
              name="otpCode"
              {...register("otpCode")}
              className="form-control"
              id="otpInput"
              placeholder="Enter your OTP"
              maxLength="6"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 btnSetup">
            Verify OTP
          </button>
        </form>
      </div>
      {verificationResult && (
        <div className="mt-3 text-center">
          {/* Display verification result, success, or error message */}
          {verificationResult.success ? (
            <p className="text-success">OTP verified successfully!</p>
          ) : (
            <p className="text-danger">
              OTP verification failed. Please try again.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default OTPVerification;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
