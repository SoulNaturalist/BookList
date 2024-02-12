import React from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import useSWR from "swr";
import axios from "axios";
import { CenteredFlexWrapper } from "../styles/Layout.styles";
import BookReview from "../layouts/BookReview.jsx";
import UseTitle from "../../hooks/UseTitle.js";

export default function UserReview() {
  const { username } = useParams();
  const { data: authData } = useSWR("http://127.0.0.1:3030/api/auth", () =>
    axios.get("http://127.0.0.1:3030/api/auth", { withCredentials: true }),
  );
  const { data: userData } = useSWR(
    username ? `http://127.0.0.1:3030/api/user/${username}` : null,
    () =>
      axios.get(`http://127.0.0.1:3030/api/user/${username}`, {
        withCredentials: true,
      }),
  );

  if (!authData) {
    return (
      <CenteredFlexWrapper>
        <CircularProgress disableShrink />
      </CenteredFlexWrapper>
    );
  }

  if (!userData) {
    return (
      <CenteredFlexWrapper>
        <CircularProgress disableShrink />
      </CenteredFlexWrapper>
    );
  }
  const { reviews } = userData.data[0];
  const usernameCurrentUser = userData.data[0].username;
  return (
    <div>
      <UseTitle title={"Рецензии " + username}></UseTitle>
      {Object.keys(reviews).map((review, index) =>
        usernameCurrentUser && usernameCurrentUser === username ? (
          <BookReview
            key={index}
            id={index}
            owner={true}
            username={username}
            title={reviews[review].title}
            review={reviews[review].description}
            rating={reviews[review].rating}
          />
        ) : (
          <BookReview
            key={index}
            user_review={true}
            username={username}
            title={reviews[review].title}
            review={reviews[review].description}
            rating={reviews[review].rating}
          />
        ),
      )}
    </div>
  );
}
