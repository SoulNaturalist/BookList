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
    const checkAuth = () => {
        if (Data.username) {
            return true;
        }
        return false;
    }
    const checkType = () => {
        if (checkAuth) {
            if (_type === "_readed") {
                return <p className='title__book'>Мои прочитанные книги</p>
            } else if (_type === "_drop") {
                return <p className='title__book'>Мои брошенные книги</p>
    
            } else if (_type === "_planned") {
                return <p className='title__book'>Мои запланированные книги</p>
            }
        }
        return navigate("/login");
    }
    return (
        <div>
            {checkAuth ? checkType() : navigate("/login")}
            <br/>
            {loading ? Object.keys(Data.auth_data.books).map((book,index) => (
                <div key={index}>
                    <img src={Object.values(Data.auth_data.books)[index].cover} alt='cover' style={{width: '10%', height: '10%', display:'block',margin:'auto'}}/>
                    <p className="book_name" style={{textAlign:"center"}}>{book}</p>
                </div>
            )):<div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress disableShrink /></div>}
        </div>
    );
    
}

export default UserBooks;