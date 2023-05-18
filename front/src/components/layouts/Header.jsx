import useSWR from 'swr';
import React from 'react';
import logo from '../../assets/logo.png';
import {HeaderComponent, TitleHeader, ImgHeader, ParagraphLogin, Link} from "../styles/Header.styles";

function Header() {
    const { data } = useSWR('http://127.0.0.1:3030/api/auth', (apiURL) => fetch(apiURL,{
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => res.json()));
    const loginComponent = () => {
        const subLink = window.location.href.split("/")[3];
        if (data && data.auth_data && subLink !== "logout") {
            return <ParagraphLogin><Link href={`/user/${data.auth_data.username}`}>Профиль</Link></ParagraphLogin>
        } else {
            return <ParagraphLogin><Link href="/login">Войти</Link></ParagraphLogin>
        }
    }
    return (
        <HeaderComponent>
            <Link href="/">
                <ImgHeader src={logo}/>
                <TitleHeader>
                    BookList
                </TitleHeader>
            </Link>
            {loginComponent()}
        </HeaderComponent>
    );
};

export default Header;