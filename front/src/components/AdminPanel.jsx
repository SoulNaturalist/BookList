import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';


function AdminPanel () {
    const navigate = useNavigate();
    const [Data,setData] = React.useState([]);
    const [Books,setBooks] = React.useState([]);
    const [Users,setUsers] = React.useState([]);
    const [loading,setLoading] = React.useState(false);
    React.useEffect(() => {
        axios({method: 'post',url:'http://127.0.0.1:3030/api/auth',withCredentials: true, headers: {}})
        .then(response => {
            setData(response.data.auth_data)
        })
        axios({method: 'get',url:'http://127.0.0.1:3030/api/get_library_books',withCredentials: true, headers: {}})
        .then(response => {
            setBooks(response.data)
        })
        axios({method: 'get',url:'http://127.0.0.1:3030/api/get_users',withCredentials: true, headers: {}})
        .then(response => {
            setUsers(response.data)
            setLoading(true)
        })
    }, [])
    const checkPermission = () => {
        if (Data) {
            if (Data.role === 3) {
                return <div>
                    <h1 style={{textAlign: 'center',position: 'relative', top: '30px', fontFamily: 'Roboto'}}>Админ панель, {Data.auth_data.username}</h1>
                    <p style={{textAlign: 'center',position: 'relative', top: '40px', fontFamily: 'Roboto'}}>Зарегистрированных пользователей - {Users.length}</p>
                    <p style={{textAlign: 'center',position: 'relative', top: '50px', fontFamily: 'Roboto'}}>Книг на сайте - {Books.length}</p>
                </div>
            } else {
                return navigate(`/user/${Data.username}`)
            }
        }
    }
    return (
        <div>
            {loading ? checkPermission():<div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress disableShrink /></div>}
        </div>
    );
    
}

export default AdminPanel;