import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  ParagraphBook,
  FlexWrapper,
  ParagraphBookName,
  ImgCover,
} from "../styles/UserBooks.styles";
import useSWR from "swr";

function UserBooks() {
  const { _type, username } = useParams();
  const navigate = useNavigate();
  const fetchAuthData = async () => {
    const response = await axios.post("http://127.0.0.1:3030/api/auth", {
      withCredentials: true,
    });
    return response.data;
  };
  const fetchUserData = async () => {
    const response = await axios.get(
      `http://127.0.0.1:3030/api/user/${username}`,
      { withCredentials: true },
    );
    return response.data[0];
  };

  const { data: authData, error: authError } = useSWR(
    "authData",
    fetchAuthData,
    { revalidateOnFocus: false },
  );
  const { data: userData, error: userError } = useSWR(
    "userData",
    fetchUserData,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  const loading = !userData && !userError;

  const checkType = () => {
    if (authData) {
      if (_type === "_readed") {
        return (
          <ParagraphBook>
            {userData && userData.username} прочитанные книги
          </ParagraphBook>
        );
      } else if (_type === "_drop") {
        return (
          <ParagraphBook>
            {userData && userData.username} брошенные книги
          </ParagraphBook>
        );
      } else if (_type === "_planned") {
        return (
          <ParagraphBook>
            {userData && userData.username} запланированные книги
          </ParagraphBook>
        );
      }
    }
  };

  const checkStatusBook = (status, book) => {
    return book.book_status === status.split("_")[1];
  };

  if (authError || userError) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      {authData ? checkType() : null}
      <br />
      {loading ? (
        <FlexWrapper>
          <CircularProgress disableShrink />
        </FlexWrapper>
      ) : (
        userData &&
        userData.books &&
        Object.keys(userData.books).map((book, index) => (
          <div key={index}>
            {checkStatusBook(_type, Object.values(userData.books)[index]) ? (
              <div>
                <a
                  href={`http://127.0.0.1:3000/book/${Object.values(userData.books)[index].slug}`}
                >
                  <ImgCover
                    src={Object.values(userData.books)[index].cover}
                    alt="cover"
                  />
                  <ParagraphBookName>{book}</ParagraphBookName>
                </a>
              </div>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
}

export default UserBooks;
