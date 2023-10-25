import React, {Fragment} from 'react';
import Header from './components/layouts/Header.jsx';
import Home from './components/pages/Home.jsx';
import LoginForm from './components/pages/LoginForm.jsx';
import BookPage from './components/pages/BookPage.jsx';
import BooksCatalog from './components/pages/BooksCatalog.jsx';
import ChangeProfile from './components/pages/ChangeProfile.jsx';
import UserBooks from './components/pages/UserBooks.jsx';
import LogoutPage from './components/pages/LogoutPage.jsx';
import RegistrationForm from './components/pages/RegistrationForm';
import ConfirmEmail from './components/pages/ConfirmEmail';
import CheckEmail from './components/pages/CheckEmail';
import PasswordChange from './components/pages/PasswordChange';
import UserPage from './components/pages/UserPage';
import LeaderBoard from './components/pages/LeaderBoard';
import Rules from './components/pages/Rules';
import UserReview from './components/pages/UserReview';
import Dialogs from './components/pages/Dialogs.jsx';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import './App.css';
import GlobalStyle from './components/styles/global.styles.js';
import { HelmetProvider } from "react-helmet-async";

function App() {

return (
  <HelmetProvider>
    <div className="App">
      <Router>
        <Header/>
        <Fragment>
          <GlobalStyle/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/registration" element={<RegistrationForm/>} />
            <Route path="/logout" element={<LogoutPage/>}/>
            <Route path="/change_profile" element={<ChangeProfile />}/>
            <Route path="/change_password" element={<PasswordChange/>}/>
            <Route path="/catalog" element={<BooksCatalog/>}/>
            <Route path="/book/:slug" element={<BookPage />}/>
            <Route path="/check_email" element={<CheckEmail/>}/>
            <Route path="/leader_board" element={<LeaderBoard/>}/>
            <Route path="/rules" element={<Rules/>}/>
            <Route exec path="/user/:username/books:_type" element={<UserBooks />}/>
            <Route exec path="/user/:username/reviews" element={<UserReview />}/>
            <Route exec path="/user/:username" element={<UserPage />}/>
            <Route exec path="/email_confirm/:code" element={<ConfirmEmail/>}/>
            <Route exec path="/dialogs/" element={<Dialogs/>}/>
          </Routes>
        </Fragment>
      </Router>
    </div>
  </HelmetProvider>
)}

export default App;