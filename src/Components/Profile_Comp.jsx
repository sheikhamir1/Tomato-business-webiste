import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { ProductContext } from "./ProductContect";
import "./Profile.css";

const Profile_Comp = () => {
  const { userDetails, setUserDetails } = useContext(ProductContext);

  // Make sure to handle the case where userDetails might not be available
  const username = localStorage.getItem("username");

  const [isLoading, setIsLoading] = useState(true);
  const { register, handleSubmit, setValue } = useForm();

  // Fetch user details function
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/getUserDetails?userName=${username}`,
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

      if (!data) {
        throw new Error("Empty response from server");
      }

      setUserDetails(data);
      setValue("userFirstName", data.userFirstName);
      setValue("userLastName", data.userLastName);
      setValue("userMobileNumber", data.mobile);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setIsLoading(false);
    }
  };

  // Update user details function
  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:8080/updateUserDetails?userName=${username}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userFirstName: data.userFirstName,
            userLastName: data.userLastName,
            userMobileNumber: data.userMobileNumber,
          }),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setUserDetails(updatedData);
        alert("User details updated successfully!");
        window.location.reload(); // Optionally, you can remove this if you want to avoid a full reload
      } else {
        alert("Failed to update user details.");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      alert("Error updating user details.");
    }
  };

  // Fetch user details when the component mounts
  useEffect(() => {
    if (username) {
      fetchUserDetails();
    } else {
      setIsLoading(false); // If no username, stop loading
    }
  }, [username, setValue]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-card">
          <div className="profile-header">
            <h2 className="profile-title">Profile Information</h2>
          </div>
          <div className="profile-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="profile-field">
                <label className="profile-label">User Name:</label>
                <input
                  type="text"
                  value={userDetails.userName}
                  readOnly
                  className="profile-input non-editable"
                />
              </div>
              <div className="profile-field">
                <label className="profile-label">Email:</label>
                <input
                  type="email"
                  value={userDetails.userEmail}
                  readOnly
                  className="profile-input non-editable"
                />
              </div>
              <div className="profile-field">
                <label className="profile-label">First Name:</label>
                <input
                  type="text"
                  {...register("userFirstName")}
                  className="profile-input editable"
                />
              </div>
              <div className="profile-field">
                <label className="profile-label">Last Name:</label>
                <input
                  type="text"
                  {...register("userLastName")}
                  className="profile-input editable"
                />
              </div>
              <div className="profile-field">
                <label className="profile-label">Mobile:</label>
                <input
                  type="text"
                  {...register("userMobileNumber")}
                  className="profile-input editable"
                />
              </div>
              <div className="profile-actions">
                <button type="submit" className="profile-button btnSetup">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_Comp;
