import React from 'react';
import useSWR from 'swr';
import { useParams, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import planned from "../../assets/realtime-protection.png";
import dropped from "../../assets/1828939.png";
import readed from "../../assets/open-book.png";
import {
  FlexWrapper,
  ReviewCard,
  ParagraphWrapper,
  ParagraphAuthor,
  ParagraphReview,
  ParagraphDescription,
  TitleBook,
  ParagraphBook,
  BookCoverImg,
  WrapperButton,
  Wrapper,
  ImgButton,
  ButtonBook
} from "../styles/BookPage.styles";

function BookPage() {
  const { slug } = useParams();
  const [AlertSuccess, setAlert] = React.useState(false);
  const [currentUser, setUser] = React.useState(false);
  const navigate = useNavigate();

  const fetchBookBySlug = async (url) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug: slug }),
    });
    const data = await response.json();
    return data;
  };

  const { data: bookData, error: bookError } = useSWR(
    'http://127.0.0.1:3030/api/get_book_by_slug',
    fetchBookBySlug
  );

  const fetchAuthData = async (url) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };

  const { data: authData, error: authError } = useSWR(
    'http://127.0.0.1:3030/api/auth',
    fetchAuthData
  );

  React.useEffect(() => {
    if (authData) {
      setUser(authData);
    }
  }, [authData]);

  function addBook(status) {
    if (Boolean(currentUser.auth_data)) {
      let formatBook = { ...bookData };
      delete formatBook.reviews;
      fetch('http://127.0.0.1:3030/api/add_book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          book_name: formatBook.book_name,
          book_author: formatBook.book_author,
          year_of_release: formatBook.year_of_release,
          book_status: status,
          cover: formatBook.cover,
          slug: formatBook.slug,
        }),
      }).then(() => setAlert(true));
    } else {
      return navigate("/login");
    }
  }

  if (bookError || authError) {
    return <div>Error loading data...</div>;
  }

  if (!bookData || !authData) {
    return <FlexWrapper><CircularProgress disableShrink /></FlexWrapper>;
  }

  return (
    <Wrapper>
      <TitleBook>{bookData.book_name} {bookData.book_author}</TitleBook>
      <ParagraphBook>{bookData.description}</ParagraphBook>
      <BookCoverImg src={bookData.cover} alt="cover" />
      <WrapperButton>
        <ButtonBook onClick={() => addBook("readed")}>
          <ImgButton src={readed} alt="readed_icon" />
        </ButtonBook>
        <ButtonBook onClick={() => addBook("drop")}>
          <ImgButton src={dropped} alt="drop_icon" />
        </ButtonBook>
        <ButtonBook onClick={() => addBook("planned")}>
          <ImgButton src={planned} alt="planned_icon" />
        </ButtonBook>
      </WrapperButton>
      {AlertSuccess ? <Alert severity="success" style={{ width: "20%", margin: "0 auto" }} className="alert_success">Книга добавлена!</Alert> : ""}
      {bookData && bookData.reviews ? [bookData.reviews].map((data, key) => (
        Object.keys(data).map((review, index) => (
          <ReviewCard key={key}>
            <ParagraphWrapper>
              <ParagraphAuthor>{Object.keys(data)[index]}</ParagraphAuthor>
              <ParagraphReview>{data[review].title}</ParagraphReview>
              <ParagraphDescription>{data[review].description}</ParagraphDescription>
            </ParagraphWrapper>
          </ReviewCard>
        ))
      )) : ""}
    </Wrapper>
  );
}

export default BookPage;