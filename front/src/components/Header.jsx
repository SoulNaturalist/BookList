import React from 'react';
import axios from 'axios';
import logo from '../assets/logo.png';

function Header() {
    const [Data,setData] = React.useState("");
    React.useEffect(() => {
        axios({method: 'post',url:'http://127.0.0.1:3030/api/auth',withCredentials: true, headers: {}})
        .then(response => {setData(response.data)})
        .catch((err) => console.log(err))
    }, [])
    const loginComponent = () => {
        const subLink = window.location.href.split("/")[3];
        if (Data.auth_data && subLink && subLink !== "logout") {
            return <p className="profile"><a href={`/user/${Data.auth_data.username}`}>Профиль</a></p>
        } else {
            return <p className="log-in"><a href="/login">Войти</a></p>
        }
    }
    return (
        <div className="header">
            <header>
                <nav>
                    <ul>
                        <li>
                            <img className="logo" src={logo} alt="logo"/>
                            <h1><a href="/">BookList</a></h1>
                            {loginComponent()}
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default Header;
