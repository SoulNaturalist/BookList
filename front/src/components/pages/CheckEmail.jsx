import React from "react";
import emailCheckImg from "../../assets/undraw_Opened_re_i38e.png";
import { AlertTitle, ImgEmail } from "../styles/CheckEmail.styles";
import UseTitle from "../../hooks/UseTitle.js";

function CheckEmail() {
  return (
    <div>
      <UseTitle title="Подтверждение почты"></UseTitle>
      <AlertTitle>
        Проверьте почту,на неё было отправлено письмо с подтверждением.
      </AlertTitle>
      <ImgEmail src={emailCheckImg} alt="email" />
    </div>
  );
}
export default CheckEmail;
