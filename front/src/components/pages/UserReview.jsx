import React from 'react';
import Rating from '@mui/material/Rating';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import useSWR from 'swr';
import axios from 'axios';
import {Title, ReviewCardProfile, BookNameTitle, BookTitleReview, BookDescription} from "../styles/UserReview.styles";

export default function UserReview() {
  const { username } = useParams();
  const { data: authData } = useSWR('http://127.0.0.1:3030/api/auth', () =>
    axios.get('http://127.0.0.1:3030/api/auth', { withCredentials: true })
  );
  const { data: userData } = useSWR(
    username ? `http://127.0.0.1:3030/api/user/${username}` : null,
    () =>
      axios.get(`http://127.0.0.1:3030/api/user/${username}`, {
        withCredentials: true,
      })
  );

  if (!authData) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress disableShrink />
      </div>
    );
  }

  if (!userData) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress disableShrink />
      </div>
    );
  }
  const { reviews } = userData.data[0];

  return (
    <div>
      <Title>Рецензии {username}</Title>
      {Object.keys(reviews).map((review, index) => (
        <ReviewCardProfile key={index}>
          <BookNameTitle>{review}</BookNameTitle>
          <BookTitleReview>{reviews[review].title}</BookTitleReview>
          <BookDescription>{reviews[review].description}</BookDescription>
          <Rating name="read-only" value={reviews[review].rating} readOnly />
        </ReviewCardProfile>
      ))}
    </div>
  );
}