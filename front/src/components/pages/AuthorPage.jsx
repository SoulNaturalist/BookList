import React from "react";
import useSWR from "swr";
import { useParams, useNavigate } from "react-router-dom";
import AuthorCard from "../layouts/AuthorCard";
import AuthorBooksCard from "../layouts/AuthorBooksCard";
import {BottomFlexWrapper} from "../styles/UserPage.styles";
import CircularProgress from "@mui/material/CircularProgress";
import UseTitle from "../../hooks/UseTitle";
import {TitleAuthor} from "../styles/AuthorPage.styles";

export default function AuthorPage() {
  let { authorName } = useParams();
  const isProduction = process.env.REACT_APP_SERVER === 'PRODUCTION';
  const apiUrlAuthor = isProduction ? "http://api.courseio.ru/api/get_author_data": 'http://127.0.0.1:3030/api/get_author_data';
  const apiUrlBooks = isProduction ? "http://api.courseio.ru/api/get_author_books": 'http://127.0.0.1:3030/api/get_author_books';
  const fetchAuthorData = async () => {
    const response = await fetch(apiUrlAuthor, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        authorName:authorName
      }),
    });
    const data = response.json();
    return data;
  };

  const { data: dataAuthor, isLoading } = useSWR(
    "get_author_data",
    fetchAuthorData,
  );
  const fetchBooksData = async () => {
    const response = await fetch(apiUrlBooks, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        authorName:authorName
      }),
    });
    const data = response.json();
    return data;
  };
  const { data: dataBooks, isLoadingBooks } = useSWR(
    "get_author_books",
    fetchBooksData,
  );
  return !isLoading  && !isLoadingBooks ? <div>
    <UseTitle title={authorName}/>
    <TitleAuthor>Книги автора</TitleAuthor>
    <AuthorCard img={dataAuthor.author_img} authorName={`${dataAuthor.author_name} ${dataAuthor.author_surname} ${dataAuthor.author_patronymic}`} description={dataAuthor.description}/>
    <AuthorBooksCard books={dataBooks}/>
    </div>:<BottomFlexWrapper><CircularProgress disableShrink /></BottomFlexWrapper>
}
