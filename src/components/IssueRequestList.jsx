import React, { useState, useEffect } from "react";
import axios from "axios";
import "./IssueRequestListcss.css";

const IssueRequestList = () => {
  const [issueRequests, setIssueRequests] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchIssueRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/library/viewrequests"
        );
        setIssueRequests(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch issue requests");
      }
    };

    fetchIssueRequests();
  }, []);

  return (
    <>
    <div className="mainissue-div">
      <br />
      <h2>Issue Requests</h2>
      {error && <p>{error}</p>}





    
    </div>

    <div className="book-list-container">
        <div className="book-list">
          {issueRequests.map((requestevents, index) => (
            <div key={index} className="book-item">
              <img src="https://www.shutterstock.com/image-vector/information-request-vector-image-isolated-260nw-1294152517.jpg" alt={requestevents.reqid} className="book-image" />
              <div className="book-content">
                <div className="title">Request id:{requestevents.reqid}</div>
                <div className="isbn">Book Id :{requestevents.bookid}</div>
                <div className="isbn">Status :{requestevents.requesttype}</div>
              </div>
            </div>
          ))}
        </div>
      </div>


    </>
  );
};

export default IssueRequestList;
