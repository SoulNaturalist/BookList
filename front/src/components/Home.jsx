import React from 'react';
import axios from 'axios';
import bookHomeImg from '../assets/undraw_Books_re_8gea.png'
import CircularProgress from '@mui/material/CircularProgress';

function Home() {
    const [User, setUser] = React.useState([]);
    const [Error,setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        axios('http://127.0.0.1:3030/api/auth',{method: 'post',mode:'no-cors',withCredentials: true})
        .then(res => {
            setUser(res.data)
            setLoading(true)
        })
        .catch(err => {
            setError(err)
            setLoading(true)
        })
    }, [])
    const Username = () => {
        if (User.auth_data) {
            return User.auth_data.username;
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
            {loading ? libraryWelcomeElement : <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress disableShrink /></div>}
        </div>
    );
};

export default Home;