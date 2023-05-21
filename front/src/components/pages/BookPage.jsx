import React from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import planned from "../../assets/realtime-protection.png";
import dropped from "../../assets/1828939.png";
import readed from "../../assets/open-book.png";
import {FlexWrapper, ReviewCard, ParagraphWrapper, ParagraphAuthor, 
  ParagraphReview, ParagraphDescription, TitleBook, ParagraphBook, 
  BookCoverImg, WrapperButton, Wrapper, ImgButton, ButtonBook} from "../styles/BookPage.styles";

function BookPage () {
  const { slug } = useParams();
  const [Book,setBook] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [AlertSuccess,setAlert] = React.useState(false);
  const [currentUser, setUser] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    axios({method: 'post',url:`http://127.0.0.1:3030/api/get_book_by_slug`,withCredentials: true, headers: {},data: {slug:slug}})
    .then(response => {
      setBook(response.data)
      setLoading(false)
    })
  }, [slug])
  React.useEffect(() => {
    axios({method: 'post',url:`http://127.0.0.1:3030/api/auth`,withCredentials: true, headers: {}})
    .then(response => {
      setUser(response.data)
      setLoading(false)
    })
  }, [])
  function addBook(status) {
    if (Boolean(currentUser.auth_data)) {
      let formatBook = { ...Book };
      delete formatBook.reviews;
      axios({method: 'post',url:`http://127.0.0.1:3030/api/add_book`,withCredentials: true, headers: {},data: {
        book_name:formatBook.book_name,book_author:formatBook.book_author,year_of_release:formatBook.year_of_release,
        book_status:status,cover:formatBook.cover,slug:formatBook.slug
      }})
      .then(() => setAlert(true))
    } else {
      return navigate("/login")
    }
  }
  return loading ? <FlexWrapper><CircularProgress disableShrink /></FlexWrapper>:
  <Wrapper>
    <TitleBook>{Book.book_name} {Book.book_author}</TitleBook>
    <ParagraphBook>{Book.description}</ParagraphBook>
    <BookCoverImg src={Book.cover} alt="cover"/>
    <WrapperButton>
      <ButtonBook onClick={() => addBook("readed")}>
        <ImgButton src={readed} alt="readed_icon"/>
      </ButtonBook>
      <ButtonBook onClick={() => addBook("drop")}>
        <ImgButton src={dropped} alt="drop_icon"/>
      </ButtonBook>
      <ButtonBook onClick={() => addBook("planned")}>
        <ImgButton src={planned} alt="planned_icon"/>
      </ButtonBook>
    </WrapperButton>
    {AlertSuccess ?  <Alert severity="success" style={{width:"20%",margin:"0 auto"}} className="alert_success">Книга добавлена!</Alert> : ""}
      {Book && Book.reviews ? [Book.reviews].map((data, key) => (
        Object.keys(data).map((review, index) => (
          <ReviewCard key={key}>
            <ParagraphWrapper>
              <ParagraphAuthor>{Object.keys(data)[index]}</ParagraphAuthor>
              <ParagraphReview>{data[review].title}</ParagraphReview>
              <ParagraphDescription>{data[review].description}</ParagraphDescription>
            </ParagraphWrapper>
          </ReviewCard>
        ))
      )):""}
  </Wrapper>
}

export default BookPage;