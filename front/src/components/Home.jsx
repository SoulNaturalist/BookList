import React from 'react';
import axios from 'axios';
import books_library from "../assets/library.jpg";
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
    const LibraryEelement = <div>
        <p className="welcome_title">Добро пожаловать {Username()}</p>
        <p className="site_description">BookList - это онлайн библиотека добавляй книги,пиши рецензии и оцени прочитанные книги по достоинству.</p>
        <img className="library_photo" src={books_library} alt="library_photo"/>
    </div>
    return (
        <div>
            {loading ? LibraryEelement : <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress disableShrink /></div>}
        </div>
    );
};

export default Home;