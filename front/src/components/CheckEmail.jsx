import React from 'react';
import emailCheckImg from '../assets/undraw_Opened_re_i38e.png'

function CheckEmail () {
    return <div>
        <h2 className="check_email">Проверьте почту,на неё было отправлено письмо с подтверждением.</h2>
        <img src={emailCheckImg} alt="email" className="email_icon"/>
    </div>
}
export default CheckEmail;
