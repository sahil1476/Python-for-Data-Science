import React, { useState } from "react";
import axios from "axios";
import "./AddBookcss.css";




const AddBookForm = () => {
  const [formData, setFormData] = useState({
    book: {
      isbn: "",
      lib_id: "",
      title: "",
      authors: "",
      publisher: "",
      version: "",
      total_copies: "",
      available_copies: "",
    },
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "isbn"  ||
      name === "lib_id" ||
      name === "total_copies" ||
      name === "available_copies"
        ? parseInt(value, 10) || ""
        : value;
    setFormData({
      ...formData,
      book: {
        ...formData.book,
        [name]: updatedValue,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/library/add_book",
        formData.book
      );
      setMessage(formData.book.title + " added successfully.");
      setError("");
    } catch (err) {
      setMessage("");
      setError(err.response.data.error || "Failed to add book.");
    }
  };

  return (
    <div className="mainadd-div">
      <div className="add-div">
        <h2>ADDING BOOKS</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="isbn"
            placeholder="ISBN"
            value={formData.book.isbn}
            onChange={handleChange}
            required
          /> 
        <br />
        <br />
        
          <br />
          <input
            type="text"
            name="lib_id"
            placeholder="Library ID"
            value={formData.book.lib_id}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.book.title}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="text"
            name="authors"
            placeholder="Authors"
            value={formData.book.authors}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="text"
            name="publisher"
            placeholder="Publisher"
            value={formData.book.publisher}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="text"
            name="version"
            placeholder="Version"
            value={formData.book.version}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="number"
            name="total_copies"
            placeholder="Total Copies"
            value={formData.book.total_copies}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="number"
            name="available_copies"
            placeholder="Available Copies"
            value={formData.book.available_copies}
            onChange={handleChange}
            required
          />
          <br />

          <br />
          <button type="submit">Add Book</button>
        </form>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default AddBookForm;
