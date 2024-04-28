import React, { useState } from "react";
import axios from "axios";
import "./RemoveBook.css";

const RemoveBookForm = () => {
  const [formData, setFormData] = useState({

    updated_details: {
      isbn:""
    },

    successMessage: "",
    errorMessage: "",
  });
  // const [message, setMessage] = useState("");
  // const [error, setError] = useState("");


  // const handleChange = (e) => {
  //   const { value } = e.target;
  //   setIsbn(value);
  // };
  // parseInt(isbn,10)
  // console.log(typeof isbn )

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "isbn"  
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


    console.log(typeof(formData.updated_details.isbn))
    try {
      // Ensure both fields are filled before submitting
      if (!formData.updated_details.isbn) {
        throw new Error("Please fill in both Book ID.");
      }
      
      const response = await axios.delete(
        "http://localhost:8080/library/delete",{
        data: { isbn: formData.updated_details.isbn },
    });
      setFormData({
        ...formData,
        successMessage: `Book with  isbn ${formData.updated_details.isbn} delete successfully.`,
        errorMessage: "",
      });
    } catch (err) {
      setFormData({
        ...formData,
        successMessage: "",
        errorMessage:
          err.response?.data.error || "Failed to delete book.",
      });
    }
  };








  return (
    <div className="remove-div">
      <div className="ash">
        <h2>Remove Book</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="isbn"
            placeholder="ISBN"
            value={formData.updated_details.bookid}
            onChange={handleChange}
            required
          />
          <br />

          <button type="submit">Remove Book</button>
        </form>
        <div className="message-div">
          <h1>
            {formData.successMessage && <p>{formData.successMessage}</p>}
            {/* {formData.errorMessage && <p>{formData.errorMessage}</p>} */}
          </h1>
          <div className="message-div2">
          <h1>
            {/* {formData.successMessage && <p>{formData.successMessage}</p>} */}
            {formData.errorMessage && <p>{formData.errorMessage}</p>}
          </h1>
        </div>
        </div>
      </div>
    </div>
  );
};
export default RemoveBookForm;
