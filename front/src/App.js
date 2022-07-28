import React, {Fragment} from 'react';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import LoginForm from './components/LoginForm.jsx';
import BookPage from './components/BookPage.jsx';
import BooksCatalog from './components/BooksCatalog.jsx';
import ChangeProfile from './components/ChangeProfile.jsx';
import UserBooks from './components/UserBooks.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import LogoutPage from './components/LogoutPage.jsx';
import RegistrationForm from './components/RegistrationForm';
import ConfirmEmail from './components/ConfirmEmail';
import CheckEmail from './components/CheckEmail';
import PasswordChange from './components/PasswordChange';
import UserPage from './components/UserPage';
import LeaderBoard from './components/LeaderBoard';
import Rules from './components/Rules';
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
          <Route path="/registration" element={<RegistrationForm/>} />
          <Route path="/logout" element={<LogoutPage/>}/>
          <Route path="/change_profile" element={<ChangeProfile />}/>
          <Route path="/change_password" element={<PasswordChange/>}/>
          <Route path="/catalog" element={<BooksCatalog/>}/>
          <Route path="/book/:slug" element={<BookPage />}/>
          <Route path="/admin" element={<AdminPanel />}/>
          <Route path="/check_email" element={<CheckEmail/>}/>
          <Route path="/leader_board" element={<LeaderBoard/>}/>
          <Route path="/rules" element={<Rules/>}/>
          <Route exec path="/:username/books:_type" element={<UserBooks />}/>
          <Route exec path="/user/:username" element={<UserPage />}/>
          <Route path="*" element={<ConfirmEmail/>}/>
        </Routes>
      </Fragment>
    </Router>
  </div>

)}

export default App;