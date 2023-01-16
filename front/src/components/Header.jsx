import useSWR from 'swr';
import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';

function Header() {
    const { data } = useSWR('http://127.0.0.1:3030/api/auth', (apiURL) => fetch(apiURL,{
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => res.json()));
    const Header = styled.header`
    background-color:#FF7A00
    `;
    const TitleHeader = styled.header`
    font-family: 'Manrope', sans-serif;
    position: relative;
    top:10px;
    font-size:28px;
    height:50px;
    width:50%;
    display: inline-block;
    `;
    const ImgHeader = styled.img`
    float: left;
    margin-left:15px;
    margin-top:10px;
    width:40px;
    `
    const ParagraphLogin = styled.p`
    font-size:15px;
    float:right;
    margin-top:15px;
    margin-right:5px;
    `
    const Link = styled.a`
    color:black;
    text-decoration: none;
    `
    const loginComponent = () => {
        const subLink = window.location.href.split("/")[3];
        if (data && data.auth_data && subLink !== "logout") {
            return <ParagraphLogin><Link href={`/user/${data.auth_data.username}`}>Профиль</Link></ParagraphLogin>
        } else {
            return <ParagraphLogin><Link href="/login">Войти</Link></ParagraphLogin>
        }
    }
    return (
        <Header>
            <Link href="/">
                <ImgHeader src={logo}/>
                <TitleHeader>
                    BookList
                </TitleHeader>
            </Link>
            {loginComponent()}
        </Header>
    );
};

export default Header;