import React, {Fragment} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams
} from "react-router-dom";

function BookPage() {
  let { slug } = useParams();
  return <div>Now showing post {slug}</div>;
}

function BooksLibrary () {
  return (
    <div>
      <Router>
      <Fragment>
        <Routes>
          <Route exact path="/blog/:slug" element={<BookPage />}/>
        </Routes>
      </Fragment>
    </Router>
  </div>
  
)}

export default BooksLibrary;
