import React from "react";
import useSWR from "swr";
import bookHomeImg from "../../assets/undraw_Books_re_8gea.png";
import CircularProgress from "@mui/material/CircularProgress";
import {
  ParagraphWelcome,
  ParagraphDescription,
  ImgLibrary,
  WrapperLink,
  LinkResource,
  Span,
} from "../styles/Home.styles";
import { FlexWrapperTop } from "../styles/Layout.styles";
import UseTitle from "../../hooks/UseTitle.js";


function Home() {
  const isProduction = process.env.REACT_APP_SERVER === 'PRODUCTION';
  const apiUrl = isProduction ? "http://api.courseio.ru/api/auth": 'http://127.0.0.1:3030/api/auth';
  const fetcher = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  const { data } = useSWR(apiUrl, fetcher);
  const userUsername = () => {
    if (data && data.auth_data) {
      return data.auth_data.username;
    } else {
      return "гость";
    }
  };
  const libraryWelcomeElement = (
    <div>
      <ParagraphWelcome>Добро пожаловать {userUsername()}</ParagraphWelcome>
      <ParagraphDescription>
        BookList - это онлайн библиотека добавляй книги,пиши рецензии и оцени
        прочитанные книги по достоинству.
      </ParagraphDescription>
      <ParagraphDescription>
        Также ты можешь скачать книги на нашем сайте.
      </ParagraphDescription>
      <ImgLibrary src={bookHomeImg} alt="library_photo" />
      <WrapperLink>
        <LinkResource href="/rules">Правила</LinkResource>
        <Span>&</Span>
        <LinkResource href="/catalog">Каталог</LinkResource>
      </WrapperLink>
    </div>
  );
  return (
    <div>
      <UseTitle title="Добро пожаловать :)"></UseTitle>
      {data ? (
        libraryWelcomeElement
      ) : (
        <FlexWrapperTop>
          <CircularProgress disableShrink />
        </FlexWrapperTop>
      )}
    </div>
  );
}

export default Home;
