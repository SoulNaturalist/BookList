import useSWR from 'swr';
import React from 'react';
import logo from '../assets/logo.png';

function Header() {
    const { data } = useSWR('http://127.0.0.1:3030/api/auth', (apiURL) => fetch(apiURL,{
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => res.json()));
    const loginComponent = () => {
        const subLink = window.location.href.split("/")[3];
        if (data && data.auth_data && subLink !== "logout") {
            return <p className="profile"><a href={`/user/${data.auth_data.username}`}>Профиль</a></p>
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
