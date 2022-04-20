import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import axios from 'axios';
import logo from '../assets/logo.png';

function Header() {
    const [Data,setData] = React.useState("");
    React.useEffect(() => {
        axios({method: 'post',url:'http://127.0.0.1:3030/api/auth',withCredentials: true, headers: {}})
        .then(response => {setData(response.data)})
    }, [])
    const ProfileElement = () => {
        if (Data.auth_data) {
            return <p className="profile"><a href="/profile">Профиль</a></p>
        } else {
            return "";
        }

    }
    return (
        <div className="header">
            <header>
                <nav>
                    <ul>
                        <li>
                            <Router>
                                <img className="logo" src={logo} alt="logo"/>
                                <h1><a href="/">BookList</a></h1>
                                {ProfileElement()}
                            </Router>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default Header;
