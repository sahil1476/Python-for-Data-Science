import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./VerifyAdmin.css";
import AdminPagefin from "./AdminPagefin";


const VerifyAdmin = () => {




  const [formData, setFormData] = useState({
   

    updated_details: {
      email: "",
      password:"",
    },


    successMessage: "",
    errorMessage: "",
  });





  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "bookid" 
        ? parseInt(value, 10)
        : value;
    setFormData({
      ...formData,
      updated_details: {
        ...formData.updated_details,
        [name]: updatedValue,
      },
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure both fields are filled before submitting
      if (!formData.updated_details.email) {
        throw new Error("Please fill the email.");
      }
      
      const response = await axios.post(
        "http://localhost:8080/library/verifyadmin",
        formData.updated_details
      );
      setFormData({
        ...formData,
        successMessage: `verified`,
        errorMessage: "",
      });
    } catch (err) {
      setFormData({
        ...formData,
        successMessage: "",
        errorMessage:
          err.response?.data.error || "Failed to login.",
      });
    }

    
  };



  if (formData.successMessage === "verified") {

    return(
      
      <AdminPagefin/>

      
      
      
    )
    
  }

  return (
    <div className="raisemain-div2">
      <div className="raise-div2">
        <h2>Sign in as Admin</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.updated_details.email}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.updated_details.password}
            onChange={handleChange}
            required
            
          />
          <br />
          <br />
          <br />
          <button type="submit">Login </button>
        </form>
       


        {formData.errorMessage && <p>{formData.errorMessage}</p>}
      </div>
    </div>
  );
};

export default VerifyAdmin;
