import React from 'react';
import axios from "axios";
import { useLocation } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';

function ConfirmEmail () {
  const [email,setEmail] = React.useState("");
  const [loading,setLoading] = React.useState(false);
  const sampleLocation = useLocation();
  React.useEffect(() => {
    axios({method: 'post',url:`http://127.0.0.1:3030/api/confirm_email`,withCredentials: true, headers: {},data: {code:sampleLocation.pathname.split("/")[2]}})
    .then(response => {
        setEmail(response.data)
        setLoading(true)
    })
    .catch((err) => console.log(err))
  }, [sampleLocation.pathname])
  const emailComponent = () => {
    if (email['message'] === 'Почта потверждена!') {
      return <div>
        <h2 className="email_confirm">Ваша почта подтверждена!<a href="http://127.0.0.1:3000/login">Зайти на аккаунт</a></h2>
        <img src="https://www.suunto.com/contentassets/a831335e43eb4b3b90b55547ed33ab41/icon-success.png" className="icon_success" alt="icon_success"/>
      </div>
    }
}
  
  
  return loading ? emailComponent():<div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress disableShrink /></div>
}

export default ConfirmEmail;
