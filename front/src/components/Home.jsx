import React from 'react';
import axios from 'axios';

function Home() {
    const [User, setUser] = React.useState([]);
    const [Error,setError] = React.useState(false);
    React.useEffect(() => {
        axios('http://127.0.0.1:3030/api/auth',{method: 'post',mode:'no-cors',withCredentials: true})
        .then(res => {setUser(res.data)})
        .catch(err => {setError(err)})
    }, [])
    const CheckAuth = () => {
        if (User.auth_data) {
            return User.auth_data.username;
        } else {
            return "гость";
        }

    }
    return (
        <div>
            <p className="welcome_title">Добро пожаловать {CheckAuth()}</p>
            <p className="site_description">BookList - это онлайн библиотека добавляй книги,пиши рецензии и оцени прочитанные книги по достоинству.</p>
            <img className="library_photo" src="https://s3-alpha-sig.figma.com/img/75bb/939b/da5912140105fc422cacf29b447aa8ae?Expires=1644192000&Signature=cDn86l5XA6DHLTO0e1~JqO~1aBBuibCUS0YLnYqstGZniU9Ezd5fOtfTerv5Eb-TDXx6z8LpnAHA9lz5PLQNVR6MKVTVdYLi8AMoecKAxvTaVrfR3PlfvLgrcJTjKjkPrm03a54D1gRtjWLkDqgx3L7pV7qkPTuJcn4NF1oaNBfWBfVgxr-RGkGVP9oKAShMkV7PpXfKQl5J7KVX7RFMFsQOc6l8-eWf1e-UCeU1j2-EIzcEGpYrtsm3dss8DUesMzhmPEHfCTvWuAfcfegRLZjX5dnVOm-NB301bkhnE6tWkVfN3j~QRPua6kxzb5lwnkpB40i7sKEaXs2vR6pTUA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="library_photo"/>
        </div>
    );
};

export default Home;
