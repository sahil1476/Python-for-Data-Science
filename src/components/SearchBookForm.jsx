import React, { useState } from "react";
import axios from "axios";
import "./SearchBookFormcss.css";

const SearchBookForm = () => {
  const [formData, setFormData] = useState({

    imageUrl:"https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=",
    str: "",

    book: null,
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:8080/library/getbooks/${formData.str} `,
        formData
      );
      if (response.data) {
        setFormData({ ...formData, book: response.data, error: "" });
      } else {
        setFormData({ ...formData, book: null, error: "No books found" });
      }
    } catch (err) {
      setFormData({
        ...formData,
        book: null,
        error: err.response?.data.error || "Failed to search book",
      });
    }
    console.log(formData.book)
  };
  return (
    <>
    <div className="mainsearch-div">
      <div className="search-div">
        <h2> Search Book</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="str"
            placeholder="Title/Author/Publisher"
            value={formData.str}
            onChange={handleChange}
          />
          <br />
          <br />

          <br />
          <br />

          <br />
          <br />
          <button type="submit">Search</button>
        </form>
        {formData.error && <p>{formData.error}</p>}
        
      </div>
    </div>

        <div>
        {formData.book && (

<div className="book-list-container">
<div className="book-list">
  {formData.book.map((book, index) => (
    <div key={index} className="book-item">
      <img src={formData.imageUrl} alt={book.title} className="book-image" />
      <div className="book-content">
        <div className="title">{book.title}</div>
        <div className="isbn">ISBN :{book.isbn}</div>
        <div className="isbn">Publisher: {book.publisher}</div>
        <div className="isbn">Authors: {book.authors}</div>
        <div className="isbn">Available Copies : {book.available_copies}</div>

      </div>
    </div>
  ))}



</div>
</div>



        )}
        </div>
    
    </>
  );
};

export default SearchBookForm;
