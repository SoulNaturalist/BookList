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
  const { data } = useSWR("http://127.0.0.1:3030/api/auth", (apiURL) =>
    fetch(apiURL, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => res.json()),
  );
  const Username = () => {
    if (data && data.auth_data) {
      return data.auth_data.username;
    } else {
      return "гость";
    }
  };
  const libraryWelcomeElement = (
    <div>
      <ParagraphWelcome>Добро пожаловать {Username()}</ParagraphWelcome>
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
