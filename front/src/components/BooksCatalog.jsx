import React from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';


function BooksCatalog () {
    const [Books,setBooks] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [Error,setError] = React.useState(false);
    const navigate = useNavigate("/");
    React.useEffect(() => {
        axios({method: 'get',url:'http://127.0.0.1:3030/api/get_library_books',withCredentials: true, headers: {}})
        .then(response => {
            setBooks(response.data)
            setLoading(false)
        })
        .catch(err => {setError(err)})
    }, [])
    const BooksCatalog = () => {
        return <div>
            <h1 className="title__catalog">Каталог книг</h1>
            <div className="flex-wrapper">
            {loading ? (
                <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress disableShrink /></div>
            ):(
                Books.map(book => (
                    <div key={book.id} className="book__card">
                        <img src="https://s3-alpha-sig.figma.com/img/83d5/40fe/7106c91c643b369dcd348fe25c2c0864?Expires=1645401600&Signature=M-tvdi4i84WN2HDYgOyVSYDKvLxZM8ktz5B2D9kvZBzS0gIw9r4ikeRRs5uvJGWt5DA1jSEpQmtvwviRarhCDb9Bd-yGswcLus55i8uobIoqCWs-se9RNPYjsQelsAl4xX8CN8aWGqtQ6rkkSTIe8FXZTeP276n6IayJWnvmuNF1O~2Z-ICMmVvELpWFsEfuk6ggigUCWGu0nzdIn51Yjn7i94SNGoQmP7KvMLgYThUjAIBHH9DQD9NZIKkyJd~zPx8jZCX8apbnbvLuzAgZY08Qjl1xuAXnL9wx7wsYGxLIrhvdy6nbUtzTTyFB-CnDV3BuEvXIY55XQ3EAeWWamg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="cover"/>
                        <div class="container">
                            <p>{book.book_name}</p> 
                            <p>{book.book_author}</p> 
                        </div>
                    </div>
                ))
            )}
            </div>
        </div>
    }
    return (
        <div>{BooksCatalog()}</div>
    );
    
}

export default BooksCatalog;