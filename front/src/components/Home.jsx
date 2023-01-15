import React from 'react';
import useSWR from 'swr';
import bookHomeImg from '../assets/undraw_Books_re_8gea.png'
import CircularProgress from '@mui/material/CircularProgress';

function Home() {
    const { data } = useSWR('http://127.0.0.1:3030/api/auth', (apiURL) => fetch(apiURL,{method: "post",headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'},
        credentials: 'include'
    }).then(res => res.json()));
    const Username = () => {
        if (data && data.auth_data) {
            return data.auth_data.username;
        } else {
            return "гость";
        }
    }
    const libraryWelcomeElement = <div>
        <p className="welcome_title">Добро пожаловать {Username()}</p>
        <p className="site_description">BookList - это онлайн библиотека добавляй книги,пиши рецензии и оцени прочитанные книги по достоинству.</p>
        <p className="site_description">Также ты можешь скачать книги на нашем сайте.</p>
        <img className="library_photo" src={bookHomeImg} alt="library_photo"/>
        <div className="rules_link">
            <a href="/rules">Правила</a>
            <span>&</span>
            <a href="/catalog">Каталог</a>
        </div>
    </div>
    return (
        <div>
            {data ? libraryWelcomeElement : <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress disableShrink /></div>}
        </div>
    );
};

export default Home;