import React, { useState } from "react";
import axios from "axios";
import "./AddBookcss.css";



const SignupUser = () => {
  const [formData, setFormData] = useState({
    user: {
      name: "",
      email: "",
      password: "",
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
      user: {
        ...formData.user,
        [name]: updatedValue,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/library/signup",
        formData.user
      );

      console.log(formData.user.name);
      setMessage(formData.user.name + " has been successfully added.");
      setError("");
    } catch (err) {
      setMessage("");
      setError(err.response.data.error || "Failed to create user.");
    }
  };

  return (
    <div className="mainadd-div">
      <div className="add-div">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.user.name}
            onChange={handleChange}
            required
          /> 
        <br />
        <br />
        
          <br />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.user.email}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.user.password}
            onChange={handleChange}
            required
          />
          <br />
         
          <br />
          <button type="submit">Add user</button>
        </form>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default SignupUser;
