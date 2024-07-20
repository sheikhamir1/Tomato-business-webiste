import React, { useState } from "react";
import "./VerifyOTP.css";

function OTPVerification() {
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add OTP verification logic here
    alert(`OTP Submitted: ${otp}`);
  };

  return (
    <div className="otp-container d-flex justify-content-center align-items-center vh-100">
      <div className="otp-card p-5 shadow">
        <h2 className="text-center mb-4">Verify Your OTP</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="otpInput" className="form-label">
              Enter OTP
            </label>
            <input
              type="text"
              className="form-control"
              id="otpInput"
              value={otp}
              onChange={handleChange}
              maxLength="6"
              required
            />
          </div>
          <button type="submit" className=" btnSetup btn btn-primary w-100">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default OTPVerification;
