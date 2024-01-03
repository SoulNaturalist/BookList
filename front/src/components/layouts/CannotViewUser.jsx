import React from 'react'
import {ImgAlert,H2Alert} from '../styles/UserPage.styles';

export default function CannotViewUser() {
  return (
    <div>
        <H2Alert>Вы не можете просматривать профиль пользователя, зайдите на сайт!</H2Alert>
        <ImgAlert src="https://img.icons8.com/?size=256&id=yYfLzOJbAqSI&format=png"/>
    </div>
  )
}
