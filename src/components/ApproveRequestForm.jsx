import React, { useState } from "react";
import axios from "axios";
import "./ApproveRequestForm.css";

const ApproveRequestForm = () => {
  const [formData, setFormData] = useState({
   

    updated_details: {
      reqid: "",
    },


    successMessage: "",
    errorMessage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "reqid" 
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
      if (!formData.updated_details.reqid) {
        throw new Error("Please fill in both  ID.");
      }
      
      const response = await axios.post(
        "http://localhost:8080/library/approve",
        formData.updated_details
      );
      setFormData({
        ...formData,
        successMessage: `Approve request for Book ID ${formData.updated_details.reqid} raised successfully.`,
        errorMessage: "",
      });
    } catch (err) {
      setFormData({
        ...formData,
        successMessage: "",
        errorMessage:
          err.response?.data.error || "Failed to approve request.",
      });
    }
  };

  return (
    <div className="raisemain-div2">
      <div className="raise-div2">
        <h2>Approve Issue Request</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="reqid"
            placeholder="Request ID"
            value={formData.updated_details.reqid}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <br />
          <br />
          <button type="submit">Approve Request</button>
        </form>
        {formData.successMessage && <p>{formData.successMessage}</p>}
        {formData.errorMessage && <p>{formData.errorMessage}</p>}
      </div>
    </div>
  );
};

export default ApproveRequestForm;
