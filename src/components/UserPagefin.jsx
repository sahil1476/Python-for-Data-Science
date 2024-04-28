import React from 'react';
import { Link } from "react-router-dom";
import './UserPagefin.css'; // Import your CSS file for styling

const UserPagefin = () => {
  return (
    <>
   
    <div className='properties2'>

      <div className="navbar-divider">
        
      <img className="adminimage2" src="https://img.freepik.com/premium-vector/campus-search-book-icon-isometric-campus-search-book-vector-icon-web-design-isolated-white-background_96318-60121.jpg" />

        <button className='buttonstyle'> 
        <Link to="/SearchBookForm">Search Book</Link>
          </button></div>
      <div className="navbar-divider">     
      
      <img className="adminimage2" src="https://st2.depositphotos.com/15813590/44041/v/450/depositphotos_440419084-stock-illustration-raise-your-hand-ask-black.jpg" />

           <button className='buttonstyle'>
           <Link to="/RaiseIssueRequestForm">Raise Request</Link>
          </button></div>
    </div>
    </>
  );
};

export default UserPagefin;