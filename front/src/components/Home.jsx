import React from 'react';
import useSWR from 'swr';
import styled from 'styled-components';
import bookHomeImg from '../assets/undraw_Books_re_8gea.png'
import CircularProgress from '@mui/material/CircularProgress';

function Home() {
    const { data } = useSWR('http://127.0.0.1:3030/api/auth', (apiURL) => fetch(apiURL,{method: "post",headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'},
        credentials: 'include'
    }).then(res => res.json()));
    const Username = () => {
        if (data && data.auth_data) {
            return data.auth_data.username;
        } else {
            return "гость";
        }
    }
    const ParagraphWelcome = styled.p`
    font-size:25px;
    text-align: center;
    position:relative;
    top:50px;
    font-family: 'Manrope', sans-serif;
    `
    const ParagraphDescription = styled.p`
    font-size:27px;
    position: relative;
    text-align: center;
    top:80px;
    font-family: 'Manrope', sans-serif;
    `
    const ImgLibrary = styled.img`
    display:block;
    margin:auto;
    position: relative;
    top:120px;
    width:40%;
    height:auto;
    border-radius:10px;
    border: 1px solid;
    `
    const WrapperLink = styled.div`
    display:flex;
    justify-content: center;
    justify-items: center;
    position: relative;
    top:170px;
    `
    const LinkResource = styled.a`
    margin-block:10px;
    font-family: 'Manrope', sans-serif;
    `
    const Span = styled.span`
    font-size:20px;
    margin:5px;
    font-family: 'Manrope', sans-serif;
    `
    const libraryWelcomeElement = <div>
        <ParagraphWelcome>Добро пожаловать {Username()}</ParagraphWelcome>
        <ParagraphDescription>BookList - это онлайн библиотека добавляй книги,пиши рецензии и оцени прочитанные книги по достоинству.</ParagraphDescription>
        <ParagraphDescription>Также ты можешь скачать книги на нашем сайте.</ParagraphDescription>
        <ImgLibrary src={bookHomeImg} alt="library_photo"/>
        <WrapperLink>
            <LinkResource href="/rules">Правила</LinkResource>
            <Span>&</Span>
            <LinkResource href="/catalog">Каталог</LinkResource>
        </WrapperLink>
    </div>
    return (
        <div>
            {data ? libraryWelcomeElement : <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress disableShrink /></div>}
        </div>
    );
};

export default Home;