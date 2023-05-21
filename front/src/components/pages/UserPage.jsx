import React from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import readed from "../../assets/readed.png";
import drop from "../../assets/abandoned.png";
import planned from "../../assets/planned.png";
import reviews from "../../assets/review.png";
import { BooksUl, ButtonChange, ButtonMsg, ImgAvatar,
  BookMenuLi, DescriptionDiv, UsernameParagraph, DescriptionParagraph, IconsWrapper,
  IconImg, CountWrapper, CountParagraph, FlexWrapper
} from "../styles/UserPage.styles";
import useSWR from 'swr';

function UserPage() {
  const { username } = useParams();
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

  if (authError) {
    navigate("/login");
  }

  const UserProfile = () => {
    if (userData && authData) {
      const user = userData[0];
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
          <ImgAvatar src={user.avatar} className="user_avatar" alt="avatar" />
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
            <a href={`http://127.0.0.1:3000/user/${username}/books_readed`}><IconImg src={readed} alt="readed" /></a>
            <a href={`http://127.0.0.1:3000/user/${username}/books_drop`}><IconImg className="drop" src={drop} alt="drop" /></a>
            <a href={`http://127.0.0.1:3000/user/${username}/books_planned`}><IconImg className="planned" src={planned} alt="planned" /></a>
            <a href={`http://127.0.0.1:3000/user/${username}/reviews`}><IconImg className="reviews" src={reviews} alt="reviews" /></a>
          </IconsWrapper>
          <CountWrapper>
            <CountParagraph>{readedCount}</CountParagraph>
            <CountParagraph>{abandonedCount}</CountParagraph>
            <CountParagraph>{plannedCount}</CountParagraph>
            <CountParagraph>{countReviews}</CountParagraph>
          </CountWrapper>
          {authData.auth_data.username === username ? <a href="/change_profile"><ButtonChange>Редактировать</ButtonChange></a> : <ButtonMsg>Написать</ButtonMsg>}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {(authData && userData) ? (
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