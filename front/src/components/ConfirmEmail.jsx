import React from 'react';
import useSWR from 'swr';
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

function ConfirmEmail () {
  const sampleLocation = useLocation();
  const { data } = useSWR('http://127.0.0.1:3030/api/confirm_email', (apiURL) => fetch(apiURL,{method: "post",headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({code:sampleLocation.pathname.split("/")[2]})
  }).then(res => res.json()));
  const TitleEmail = styled.h2`
  text-align: center;
  position: relative;
  top:120px;
  font-family: 'Manrope', sans-serif;
  `
  const ImgSuccess = styled.img`
  width:300px;
  height:300px;
  display: block;
  margin:0 auto;
  position: relative;
  top:125px;
  `
  const emailComponent = () => {
    if (data['message'] === 'Почта потверждена!') {
      return <div>
        <TitleEmail>Ваша почта подтверждена!<a href="http://127.0.0.1:3000/login">Зайти на аккаунт</a></TitleEmail>
        <ImgSuccess src="https://www.suunto.com/contentassets/a831335e43eb4b3b90b55547ed33ab41/icon-success.png" alt="icon_success"/>
      </div>
    }
  }
  
  return data ? emailComponent():<div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress disableShrink /></div>
}

export default ConfirmEmail;