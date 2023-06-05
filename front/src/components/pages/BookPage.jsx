import React from 'react';
import useSWR from 'swr';
import { useParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
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
  Wrapper,
  SpanBadgeStyles,
  GroupStylesWrapper,
  SelectWrapper,
  AlertSuccessBook
} from "../styles/BookPage.styles";
import Select from 'react-select';

function BookPage() {
  const options = [
    { value: 'readed', label: 'Прочитана' },
    { value: 'drop', label: 'Заброшена' },
    { value: 'planned', label: 'Запланирована' }
  ]
  const { slug } = useParams();
  const [AlertSuccess, setAlert] = React.useState(false);
  const [currentUser, setUser] = React.useState(false);
  const navigate = useNavigate();

  const fetchBookBySlug = async (url) => {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
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
      credentials: 'include',
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
        credentials: 'include',
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
  const formatGroupLabel = (data) => (
    <GroupStylesWrapper>
      <span>{data.label}</span>
      <span style={SpanBadgeStyles}>{data.options.length}</span>
    </GroupStylesWrapper>
  );

  return (
    <Wrapper>
      <TitleBook>{bookData.book_name} {bookData.book_author}</TitleBook>
      <ParagraphBook>{bookData.description}</ParagraphBook>
      <BookCoverImg src={bookData.cover} alt="cover" />
      <SelectWrapper>
        <Select formatGroupLabel={formatGroupLabel} options={options} placeholder={"Статус прочтения"} onChange={(e) => addBook(e.value)}/>
      </SelectWrapper>
      {AlertSuccess ? <AlertSuccessBook>Книга добавлена!</AlertSuccessBook> : ""}
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