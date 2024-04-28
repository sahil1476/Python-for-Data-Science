import React from 'react';
import { Link } from "react-router-dom";
import './AdminPagefin.css'; // Import your CSS file for styling

const AdminPagefin = () => {
  return (
    <>
   
    <div className='properties'>

      <div className="navbar-divider">
        
      <img className="adminimage" src="https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/book_blue_add.png" />

        <button className='buttonstyle'> 
        <Link to="/AddBookForm">Add Book</Link>
          </button></div>
      <div className="navbar-divider">     
      
      <img className="adminimage" src="https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/book_blue_delete.png" />

           <button className='buttonstyle'>
           <Link to="/RemoveBookForm">Remove Book</Link>
          </button></div>
      <div className="navbar-divider">
        
      <img className="adminimage" src="https://as1.ftcdn.net/v2/jpg/02/06/50/42/1000_F_206504209_uLjScOBPP7UeUjhKelosJRr84VMLzZ0k.jpg" />

        
        <button className='buttonstyle'>
        <Link to="/UpdateBookForm">Update Book</Link>
          </button></div>

          <div className="navbar-divider">
        
        <img className="adminimage" src="https://img.freepik.com/premium-photo/new-books-white-background_392895-395803.jpg" />
  
          
          <button className='buttonstyle'>
          <Link to="/IssueRequestList">Issue List</Link>
            </button></div>


            <div className="navbar-divider">
        
        <img className="adminimage" src="https://www.shutterstock.com/image-vector/approved-credit-bill-good-score-600nw-2186445825.jpg" />
  
          
          <button className='buttonstyle'>
          <Link to="/ApproveRequestForm">Approve Request</Link>
            </button></div>
            <div className="navbar-divider">
        
        <img className="adminimage" src="https://c8.alamy.com/comp/HYCGG0/rejected-icon-rejected-website-button-on-white-background-HYCGG0.jpg" />
  
          
          <button className='buttonstyle'>
          <Link to="/DisapproveRequestForm">Disapprove Request</Link>
            </button></div>



    </div>
    </>
  );
};

export default AdminPagefin;