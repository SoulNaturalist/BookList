import React from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';

function LogoutPage () {
    const [User, setUser] = React.useState([]);
    const [Error,setError] = React.useState("");
    const [authStatus,setAuthStatus] = React.useState("");
    React.useEffect(() => {
        axios('http://127.0.0.1:3030/api/logout',{method: 'get',mode:'no-cors',withCredentials: true})
        .then(res => {setAuthStatus(res.data)})
        .catch(err => {setError(err)})
    }, [])
    const logoutAlert = () => {
        if (authStatus) {
            return <Alert variant="filled" style={{display: 'flex', justifyContent: 'center'}} severity="success">Вы успешно вышли из учетной записи!</Alert>
        }
    }
    return (
        <div>
            {logoutAlert()}
        </div>
)}

export default LogoutPage;
