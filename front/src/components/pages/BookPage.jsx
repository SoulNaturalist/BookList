import React from "react";
import useSWR from "swr";
import { useParams, useNavigate, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  FlexWrapper,
  TitleBook,
  ParagraphBook,
  BookCoverImg,
  Wrapper,
  Overlay,
  BookReviewCard,
  ReviewText,
} from "../styles/BookPage.styles";
import BookReview from "../layouts/BookReview.jsx";
import UseTitle from "../../hooks/UseTitle.js";

function BookPage() {
  const { slug } = useParams();
  const [currentUser, setUser] = React.useState(false);
  const navigate = useNavigate();
  const [focusReviewId, setFocusReviewId] = React.useState(null);

  const fetchBookBySlug = async (url) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug: slug }),
    });
    const data = await response.json();
    return data;
  };

  const { data: bookData, error: bookError } = useSWR(
    "http://127.0.0.1:3030/api/get_book_by_slug",
    fetchBookBySlug,
  );

  const fetchAuthData = async (url) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  };

  const { data: authData, error: authError } = useSWR(
    "http://127.0.0.1:3030/api/auth",
    fetchAuthData,
  );

  React.useEffect(() => {
    if (authData) {
      setUser(authData);
    }
  }, [authData]);

  React.useEffect(() => {
    const anchor = window.location.hash.substring(1);
    if (anchor && bookData) {
      setFocusReviewId(anchor);
    }
  }, [bookData]);

  React.useEffect(() => {
    const scrollToReview = () => {
      const element = document.getElementById(focusReviewId);
      if (focusReviewId && element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    const timer = setTimeout(scrollToReview, 100);

    return () => clearTimeout(timer);
  }, [focusReviewId]);

  // function addBook(status) {
  //   if (Boolean(currentUser.auth_data)) {
  //     let formatBook = { ...bookData };
  //     delete formatBook.reviews;
  //     fetch('http://127.0.0.1:3030/api/add_book', {
  //       credentials: 'include',
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         book_name: formatBook.book_name,
  //         book_author: formatBook.book_author,
  //         year_of_release: formatBook.year_of_release,
  //         book_status: status,
  //         cover: formatBook.cover,
  //         slug: formatBook.slug,
  //       }),
  //     }).then();
  //   } else {
  //     return navigate("/login");
  //   }
  // }

  if (bookError || authError) {
    return <div>Error loading data...</div>;
  }

  if (!bookData || !authData) {
    return (
      <FlexWrapper>
        <CircularProgress disableShrink />
      </FlexWrapper>
    );
  }

  return (
    <div>
      <Wrapper>
        <UseTitle title={bookData.book_name}></UseTitle>
        <TitleBook>
          {bookData.book_name} <a href="#" onClick={() => window.location.replace(`http://127.0.0.1:3000/authors/${bookData.book_author}`)}>{bookData.book_author}</a>
        </TitleBook>
        <ParagraphBook>{bookData.description}</ParagraphBook>
        <BookCoverImg src={bookData.cover} alt="cover" />
      </Wrapper>
      <ReviewText>Рецензии на книгу.</ReviewText>
      {focusReviewId && <Overlay />}
      {bookData &&
        bookData.reviews &&
        Object.entries(bookData.reviews).map(([key, value]) => (
          <React.Fragment key={key}>
            {focusReviewId === key ? (
              <BookReviewCard
                onClick={() =>
                  window.location.replace(`http://127.0.0.1:3000/user/${key}`)
                }
              >
                <BookReview
                  id={key}
                  username={key}
                  title={value.title}
                  review={value.description}
                />
              </BookReviewCard>
            ) : (
              <BookReview
                onClick={() =>
                  window.location.replace(`http://127.0.0.1:3000/user/${key}`)
                }
                id={key}
                username={key}
                title={value.title}
                review={value.description}
              />
            )}
          </React.Fragment>
        ))}
    </div>
  );
}

export default BookPage;
