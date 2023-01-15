import React from 'react';
import useSWR from 'swr';
import { useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

function ConfirmEmail () {
  const sampleLocation = useLocation();
  const { dataEmail } = useSWR('http://127.0.0.1:3030/api/confirm_email', (apiURL) => fetch(apiURL,{method: "post",headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({code:sampleLocation.pathname.split("/")[2]})
  }).then(res => res.json()));
  const emailComponent = () => {
    if (dataEmail['message'] === 'Почта потверждена!') {
      return <div>
        <h2 className="email_confirm">Ваша почта подтверждена!<a href="http://127.0.0.1:3000/login">Зайти на аккаунт</a></h2>
        <img src="https://www.suunto.com/contentassets/a831335e43eb4b3b90b55547ed33ab41/icon-success.png" className="icon_success" alt="icon_success"/>
      </div>
    }
  }
  return dataEmail ? emailComponent():<div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress disableShrink /></div>
}

export default ConfirmEmail;