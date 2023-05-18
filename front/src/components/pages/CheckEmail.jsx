import React from 'react';
import emailCheckImg from '../../assets/undraw_Opened_re_i38e.png';
import {AlertTitle, ImgEmail} from "../styles/CheckEmail.styles";

function CheckEmail () {
    return <div>
        <AlertTitle>Проверьте почту,на неё было отправлено письмо с подтверждением.</AlertTitle>
        <ImgEmail src={emailCheckImg} alt="email"/>
    </div>
}
export default CheckEmail;
