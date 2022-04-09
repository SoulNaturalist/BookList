import React from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';


function UserBooks () {
    const [Data,setData] = React.useState("");
    const [Error,setError] = React.useState("");
    const [Books,setBooks] = React.useState([]);
    React.useEffect(() => {
        axios({method: 'post',url:'http://127.0.0.1:3030/api/auth',withCredentials: true, headers: {}})
        .then(response => {
            setData(response.data)
        })
        .catch(err => {setError(err)})
    }, [])
    const { _type } = useParams();
    let navigate = useNavigate();
    const checkType = () => {
        if (_type === "_readed") {
            return <p className='title__book'>Мои прочитанные книги</p>
        } else if (_type === "_drop") {
            return <p className='title__book'>Мои брошенные книги</p>

        } else if (_type === "_planned") {
            return <p className='title__book'>Мои запланированные книги</p>
        }
        return Data ? navigate("/profile"):navigate("/login");
    }
    React.useEffect(() => {
        axios({method: 'get',url:'http://127.0.0.1:3030/api/get_library_books',withCredentials: true, headers: {}})
        .then(response => {
            setBooks(response.data)
        })
        .catch(err => {setError(err)})
    }, [])
    return (
        <div>
            {Data ? checkType():navigate("/login")}
            <br/>
            {Books.map((book,index) => (
                <div key={index}>
                    <img src={book['cover']} alt='cover' style={{width: '10%', height: '10%', display:'block',margin:'auto'}}/>
                    <p className="book_name" style={{textAlign:"center"}}>{book['book_name']}</p>
                </div>
            ))}
        </div>
    );
    
}

export default UserBooks;