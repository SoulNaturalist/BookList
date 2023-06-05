import React from 'react';
import useSWR from 'swr';
import Alert from '@mui/material/Alert';
import {FlexWrapper} from '../styles/Layout.styles';

function LogoutPage () {
    const [authStatus,setAuthStatus] = React.useState("");
    useSWR('http://127.0.0.1:3030/api/logout', (apiURL) => fetch(apiURL,{
        method: 'get',headers: {'Accept': 'application/json','Content-Type': 'application/json'},credentials: 'include'
    }).then(res => {
        res.json()
        setAuthStatus(true)
    }));
    const logoutAlert = () => {
        if (authStatus) {
            return <FlexWrapper><Alert variant="filled" severity="success">Вы успешно вышли из учетной записи!</Alert></FlexWrapper>
        }
    }
    return (
        <div>
            {logoutAlert()}
        </div>
)}

export default LogoutPage;