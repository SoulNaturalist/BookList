import React from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';


function UserBooks () {
    const { _type } = useParams();
    const navigate = useNavigate();
    const [Data,setData] = React.useState([]);
    const [Cover,setCover] = React.useState([]);
    const [Error,setError] = React.useState("");
    const [loading,setLoading] = React.useState(false);
    React.useEffect(() => {
        axios({method: 'post',url:'http://127.0.0.1:3030/api/auth',withCredentials: true, headers: {}})
        .then(response => {
            setData(response.data)
            setLoading(true)
        })
        .catch(err => {setError(err)})
    }, [])
    const checkType = () => {
        if (Data) {
            if (_type === "_readed") {
                return <p className='title__book'>{Data.auth_data.username} прочитанные книги</p>
            } else if (_type === "_drop") {
                return <p className='title__book'>{Data.auth_data.username} брошенные книги</p>
    
            } else if (_type === "_planned") {
                return <p className='title__book'>{Data.auth_data.username} запланированные книги</p>
            }
        }
        return navigate("/login");
    }
    const checkStatusBook = (status, book) => {
        if (book.book_status === status.split("_")[1]) {
            return true;
        }
        return false;
    }
    return (
        <div>
            {Data.auth_data ? checkType() : navigate("/login")}
            <br/>
            {loading ? Object.keys(Data.auth_data.books).map((book,index) => (
                <div key={index}>
                    {checkStatusBook(_type, Object.values(Data.auth_data.books)[index]) ? <div>
                        <img src={Object.values(Data.auth_data.books)[index].cover} style={{width: '10%', height: '10%', display:'block',margin:'auto'}}/>
                        <p className="book_name" style={{textAlign:"center"}}>{book}</p>
                    </div>:""}
                </div>
            )):<div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress disableShrink /></div>}
        </div>
    );
    
}

export default UserBooks;