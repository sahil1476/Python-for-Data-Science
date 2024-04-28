import React, { useState } from "react";
import axios from "axios";
import "./UpdateBookcss.css";

const UpdateBookForm = () => {
  const [formData, setFormData] = useState({
    
    updated_details: {
      isbn:"",
      lib_id: null,
      title: "",
      authors: "",
      publisher: "",
      version: "",
      total_copies: null,
      available_copies: null,
    },
    error: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "isbn"  ||
      name === "lib_id" ||
      name === "total_copies" ||
      name === "available_copies"
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
      const response = await axios.patch(
        "http://localhost:8080/library/update",
        formData.updated_details
      );
      setFormData({
        ...formData,
        message: response.data.title + " details updated successfully.",
        error: "",
      });
    } catch (err) {
      setFormData({
        ...formData,
        message: "",
        error:   "Failed to update book details.",
      });
    }
  };

  return (
    <div className="mainnupdate-div">
      <div className="mainupdate-div">
        <h2>Update Book Details</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            value={formData.isbn}
            onChange={handleChange}
            // onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            required
          />
          <br />
          <input
            type="text"
            name="lib_id"
            placeholder="Library ID"
            value={formData.updated_details.libid}
            onChange={handleChange}
            
          />
          <br />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.updated_details.title}
            onChange={handleChange}
            
          />
          <br />
          <input
            type="text"
            name="authors"
            placeholder="Authors"
            value={formData.updated_details.authors}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="publisher"
            placeholder="Publisher"
            value={formData.updated_details.publisher}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="version"
            placeholder="Version"
            value={formData.updated_details.version}
            onChange={handleChange}
          
          />
          <br />
          <input
            type="number"
            name="total_copies"
            placeholder="Total Copies"
            value={formData.updated_details.total_copies}
            onChange={handleChange}
            
          />
          <br />
          <br />
          <input
            type="number"
            name="available_copies"
            placeholder="Available Copies"
            value={formData.updated_details.available_copies}
            onChange={handleChange}
            
          />
          <br />
          <br />
          <button type="submit">Update Book</button>
        </form>
        {formData.message && <p>{formData.message}</p>}
        {formData.error && <p>{formData.error}</p>}
      </div>
    </div>
  );
};

export default UpdateBookForm;
