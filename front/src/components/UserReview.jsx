import React from 'react';
import Rating from '@mui/material/Rating';
import { useParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import useSWR from 'swr';
import axios from 'axios';

export default function UserReview() {
  const navigate = useNavigate();
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
      <h1 className="title_reviews_user">Рецензии {username}</h1>
      {Object.keys(reviews).map((review, index) => (
        <div key={index} className="review_card_profile">
          <h1 className="book_name_review">{review}</h1>
          <p className="book_title_review">{reviews[review].title}</p>
          <p className="book_description_review">{reviews[review].description}</p>
          <Rating name="read-only" value={reviews[review].rating} readOnly />
        </div>
      ))}
    </div>
  );
}