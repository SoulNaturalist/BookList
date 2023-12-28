import React, { useEffect } from 'react';
import { useLocation,useParams,useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import readed from '../../assets/readed.png';
import drop from '../../assets/abandoned.png';
import planned from '../../assets/planned.png';
import reviews from '../../assets/review.png';
import {
  BooksUl,
  ButtonChange,
  ButtonMsg,
  ImgAvatar,
  BookMenuLi,
  DescriptionDiv,
  UsernameParagraph,
  DescriptionParagraph,
  IconsWrapper,
  IconImg,
  CountParagraph,
  FlexWrapper
} from '../styles/UserPage.styles';
import useSWR, { mutate } from 'swr';
import UseTitle from '../../hooks/UseTitle.js';

function UserPage() {
  const { username } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { data: authData, error: authError } = useSWR('http://127.0.0.1:3030/api/auth', async (apiURL) => {
    const res = await fetch(apiURL, { credentials: 'include' });
    const data = await res.json();
    return data;
  });

  const { data: userData, error: userError } = useSWR(`http://127.0.0.1:3030/api/user/${username}`, async (apiURL) => {
    const res = await fetch(apiURL, { credentials: 'include' });
    const data = await res.json();
    return data;
  });

  useEffect(() => {
    if (authError && authError.response && authError.response.status === 401) {
      navigate('/login');
    }
  }, [authError, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('update') === 'true') {
      mutate('http://127.0.0.1:3030/api/auth');
    }
  }, [location.search, username]);


  const UserProfile = () => {
    if (userData && authData && !authData.message) {
      const user = userData[0];
      if (!user) return <div>User not defined</div>
      let readedCount = 0;
      let abandonedCount = 0;
      let plannedCount = 0;
      Object.getOwnPropertyNames(user.books).forEach(function (val) {
        let bookStatus = user.books[val].book_status;
        if (bookStatus === "readed") {
          readedCount += 1;
        } else if (bookStatus === "drop") {
          abandonedCount += 1;
        } else {
          plannedCount += 1;
        }
      });
      const countReviews = Object.keys(user.reviews).length;

      return (
        <div>
          <UseTitle title={`Профиль ${user.username}`}></UseTitle>
          <ImgAvatar src={user.avatar} alt="avatar" />
          <DescriptionDiv style={{ backgroundImage: `url(${user.bg})`, backgroundPosition: 'center' }}>
            <br />
            <UsernameParagraph>{user.username}</UsernameParagraph>
            <DescriptionParagraph>{user.status}</DescriptionParagraph>
          </DescriptionDiv>
          <BooksUl>
            <a href="my_books_readed"><BookMenuLi>прочитано</BookMenuLi></a>
            <a href="my_books_drop"><BookMenuLi>брошено</BookMenuLi></a>
            <a href="my_books_planned"><BookMenuLi>запланировано</BookMenuLi></a>
            <BookMenuLi>отзывы</BookMenuLi>
          </BooksUl>
          <IconsWrapper>
            <div>
              <a href={`http://127.0.0.1:3000/user/${username}/books_readed`}>
                <IconImg src={readed} alt="readed" />
                <CountParagraph>{readedCount}</CountParagraph>
              </a>
            </div>
            <div>
              <a href={`http://127.0.0.1:3000/user/${username}/books_drop`}>
                <IconImg src={drop} alt="drop" />
                <CountParagraph>{abandonedCount}</CountParagraph>
              </a>
            </div>
            <div>
              <a href={`http://127.0.0.1:3000/user/${username}/books_planned`}>
                <IconImg src={planned} alt="planned" />
                <CountParagraph>{plannedCount}</CountParagraph>
              </a>
            </div>
            <div>
              <a href={`http://127.0.0.1:3000/user/${username}/reviews`}>
                <IconImg src={reviews} alt="reviews" />
                <CountParagraph>{countReviews}</CountParagraph>
              </a>
            </div>
          </IconsWrapper>
          {authData.auth_data && authData.auth_data.username === username ? (
            <a href="/change_profile">
              <ButtonChange>Редактировать</ButtonChange>
            </a>
          ) : (
            <ButtonMsg>Написать</ButtonMsg>
          )}
        </div>
      );
    }
    if (authData.message) return <h2 styles={{textAlign:"center"}}>Вы не можете просматривать профиль пользователя, зайдите на сайт!</h2>
  };

  if (authError || userError) {
    return (
      <FlexWrapper>
        <div>При загрузке профиля произошла ошибка. Пожалуйста, обновите страницу!</div>
      </FlexWrapper>
    );
  }

  return (
    <div>
      {authData && userData ? (
       <UserProfile />
      ) : (
        <FlexWrapper>
          <CircularProgress disableShrink />
        </FlexWrapper>
      )}
    </div>
  );
}

export default UserPage;