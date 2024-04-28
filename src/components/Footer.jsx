import React from 'react';
import { Link } from "react-router-dom";
import './Footer.css'; // Import your CSS file for styling

const Footer = () => {
  return (

    <footer>
<div className="footer">
  <div className="contain">
  <div className="col">
    <h2>Company</h2>
    <ul>
      <li>About us</li>
      <li> Our Mission</li>
      <li>Services</li>
    </ul>
  </div>

 
 
  <div className="col">
    <h2>Contact</h2>
    <ul>
      <li>+91 9051 XXXXXX</li>
      <li>033 2464 XXXX</li>
      <li>abc@gmail.com</li>
    </ul>
  </div>
  <div className="col address">
    <h2>Address </h2>
    <ul>
      <li>Mohali</li>
  </ul>
  </div>
<div className="clearfix"></div>
</div>
</div>
</footer>


  );
};

export default Footer;