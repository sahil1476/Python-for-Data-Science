import React from 'react';
import { Link } from "react-router-dom";
import './StartingPagefin.css'; // Import your CSS file for styling

const StartingPagefin = () => {
  return (
    <>
   
    <div className='properties4'>

      <div className="navbar-divider4">
        
      <img className="adminimage4" src="https://t4.ftcdn.net/jpg/02/27/45/09/360_F_227450952_KQCMShHPOPebUXklULsKsROk5AvN6H1H.jpg" />

        <button className='buttonstyle4'> 
            <Link to="/VerifyAdmin">Admin </Link>
          </button></div>
      <div className="navbar-divider4">     
      
      <img className="adminimage4" src="https://img.freepik.com/premium-vector/blue-book-icon-isometric-blue-book-vector-icon-web-design-isolated-white-background_98402-33310.jpg" />

           <button className='buttonstyle4'>
            <Link to="/VerifyUser">Reader</Link>
          </button></div>
      <div className="navbar-divider4">
        
      <img className="adminimage4" src="https://st4.depositphotos.com/2495409/19737/i/450/depositphotos_197378486-stock-photo-sign-concept-illustration-isolated-white.jpg" />

        
        <button className='buttonstyle4'>
            <Link to="/SignupUser">Sign Up user</Link>
          </button></div>
    </div>
    </>
  );
};

export default StartingPagefin;