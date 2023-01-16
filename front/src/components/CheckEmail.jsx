import React from 'react';
import styled from 'styled-components';
import emailCheckImg from '../assets/undraw_Opened_re_i38e.png'

function CheckEmail () {
    const AlertTitle = styled.h2`
    text-align: center;
    position: relative;
    top:120px;
    font-family: 'Manrope', sans-serif;
    `
    const ImgEmail = styled.h2`
    width:300px;
    height:300px;
    display: block;
    margin:0 auto;
    position: relative;
    top:125px;
    `
    return <div>
        <AlertTitle>Проверьте почту,на неё было отправлено письмо с подтверждением.</AlertTitle>
        <ImgEmail src={emailCheckImg} alt="email"/>
    </div>
}
export default CheckEmail;
