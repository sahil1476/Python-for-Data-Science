import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import StartingPagefin from './components/StartingPagefin';

import VerifyAdmin from "./components/VerifyAdmin";
import VerifyUser from "./components/VerifyUser";

import UserPagefin from './components/UserPagefin'
import AdminPagefin from "./components/AdminPagefin";
import SignupUser from "./components/SignupUser";

import AddBookForm from "./components/AddBookForm";
import RemoveBookForm from "./components/RemoveBookForm";
import UpdateBookForm from "./components/UpdateBookForm";
import IssueRequestList from "./components/IssueRequestList";
import ApproveRequestForm from "./components/ApproveRequestForm";
import DisapproveRequestForm from "./components/DisapproveRequestForm";

import SearchBookForm from "./components/SearchBookForm";
import RaiseIssueRequestForm from "./components/RaiseIssueRequestForm";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
    <Navbar/>

    <Router>
      <div>
        <Routes>


          <Route index element={<StartingPagefin />}></Route>

          <Route path="VerifyAdmin" element={<VerifyAdmin />} />
          <Route path="VerifyUser" element={<VerifyUser />} />
          <Route path="DisapproveRequestForm" element={<DisapproveRequestForm />} />
          <Route path="SignupUser" element={<SignupUser />} />
          <Route path="AdminPagefin" element={<AdminPagefin />} />
          <Route path="UserPagefin" element={<UserPagefin />} />
          <Route path="AddBookForm" element={<AddBookForm />} />
          <Route path="RemoveBookForm" element={<RemoveBookForm />} />
          <Route path="UpdateBookForm" element={<UpdateBookForm />} />
          <Route path="UpdateBookForm" element={<UpdateBookForm />} />
          <Route path="IssueRequestList" element={<IssueRequestList />} />
          <Route path="ApproveRequestForm" element={<ApproveRequestForm />} />
          <Route path="SearchBookForm" element={<SearchBookForm />} />
          <Route path="RaiseIssueRequestForm" element={<RaiseIssueRequestForm />} />

        </Routes>

      </div>
    </Router>


    <Footer/>
    </>
  );
};

export default App;
