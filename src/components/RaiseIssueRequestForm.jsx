import React, { useState } from "react";
import axios from "axios";
import "./RaiseIssueRequestFormcss.css";

const RaiseIssueRequestForm = () => {
  const [formData, setFormData] = useState({
   

    updated_details: {
      bookid: "",
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
      if (!formData.updated_details.bookid) {
        throw new Error("Please fill in both Book ID.");
      }
      
      const response = await axios.post(
        "http://localhost:8080/library/addrequest/",
        formData.updated_details
      );
      setFormData({
        ...formData,
        successMessage: `Issue request for Book ID ${formData.updated_details.bookid} raised successfully.`,
        errorMessage: "",
      });
    } catch (err) {
      setFormData({
        ...formData,
        successMessage: "",
        errorMessage:
          err.response?.data.error || "Failed to raise issue request.",
      });
    }
  };

  return (
    <div className="raisemain-div1">
      <div className="raise-div1">
        <h2>Raise Issue Request</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="bookid"
            placeholder="Book ID"
            value={formData.updated_details.bookid}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <br />
          <br />
          <button type="submit">Raise Request</button>
        </form>
        {formData.successMessage && <p>{formData.successMessage}</p>}
        {formData.errorMessage && <p>{formData.errorMessage}</p>}
      </div>
    </div>
  );
};

export default RaiseIssueRequestForm;
