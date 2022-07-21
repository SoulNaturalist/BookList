import React from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';


function UserBooks () {
    const { _type, username } = useParams();
    const navigate = useNavigate("/");
    const [Data,setData] = React.useState({});
    const [user,setUser] = React.useState([]);
    const [loading,setLoading] = React.useState(false);
    React.useEffect(() => {
        axios({method: 'post',url:'http://127.0.0.1:3030/api/auth',withCredentials: true, headers: {}})
        .then(response => {
            setData(response.data)
        })
    }, [])
    React.useEffect(() => {
        axios({method: 'get',url:`http://127.0.0.1:3030/api/user/${username}`,withCredentials: true, headers: {}})
        .then(response => {
            setUser(response.data[0])
            setLoading(true)
        })
    }, [username])
    const checkType = () => {
        if (Data) {
            if (_type === "_readed") {
                return <p className='title__book'>{user.username} прочитанные книги</p>
            } else if (_type === "_drop") {
                return <p className='title__book'>{user.username} брошенные книги</p>
    
            } else if (_type === "_planned") {
                return <p className='title__book'>{user.username} запланированные книги</p>
            }
        }
    }
    const checkStatusBook = (status, book) => {
        if (book.book_status === status.split("_")[1]) {
            return true;
        }
        return false;
    }
    return (
        <div>
            {Data ? checkType():navigate("/login")}
            <br/>
            {loading ? Object.keys(user.books).map((book,index) => (
                <div key={index}>
                    {checkStatusBook(_type, Object.values(user.books)[index]) ? <div>
                        <a href={`http://127.0.0.1:3000/book/${Object.values(user.books)[index].slug}`}>
                            <img src={Object.values(user.books)[index].cover} style={{ width: 'auto', height:'20%', display: 'block', margin: 'auto', padding:'10px'}} alt="cover"/>
                            <p className="book_name" style={{textAlign:"center"}}>{book}</p>
                        </a>
                    </div>:""}
                </div>
            )):<div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress disableShrink /></div>}
        </div>
    );
    
}

export default UserBooks;