import React, { useState } from "react";
import axios from "axios";
import "./DisapproveRequestForm.css";

const DisapproveRequestForm = () => {
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





  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };








  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure both fields are filled before submitting
      if (!formData.updated_details.reqid) {
        throw new Error("Please fill in both  ID.");
      }
      
      const response = await axios.post(
        "http://localhost:8080/library/disapprove",
        formData.updated_details
      );
      setFormData({
        ...formData,
        successMessage: `Disapprove request for Book ID ${formData.updated_details.reqid} raised successfully.`,
        errorMessage: "",
      });
    } catch (err) {
      setFormData({
        ...formData,
        successMessage: "",
        errorMessage:
          err.response?.data.error || "Failed to Disapprove request.",
      });
    }
  };

  return (
    <div className="raisemain-div3">
      <div className="raise-div3">
        <h2>Disapprove Issue Request</h2>
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
          <button type="submit">Disapprove Request</button>
        </form>
        {formData.successMessage && <p>{formData.successMessage}</p>}
        {formData.errorMessage && <p>{formData.errorMessage}</p>}
      </div>
    </div>
  );
};

export default DisapproveRequestForm;
