import React, {Fragment} from 'react';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import LoginForm from './components/LoginForm.jsx';
import BooksLibrary from './components/BooksLibrary.jsx';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import './App.css';

function App() {

return (
  <div className="App">
    <Header/>
    <Router>
      <Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Fragment>
    </Router>
    <BooksLibrary/>
  </div>

)}

export default App;