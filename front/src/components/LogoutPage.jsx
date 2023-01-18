import React from 'react';
import useSWR from 'swr';
import Alert from '@mui/material/Alert';

function LogoutPage () {
    const [authStatus,setAuthStatus] = React.useState("");
    const { data } = useSWR('http://127.0.0.1:3030/api/logout', (apiURL) => fetch(apiURL,{
        method: 'get',headers: {'Accept': 'application/json','Content-Type': 'application/json'},credentials: 'include'
    }).then(res => {
        res.json()
        setAuthStatus(true)
    }));
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
