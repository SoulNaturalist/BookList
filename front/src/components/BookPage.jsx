import React from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import planned from "../assets/realtime-protection.png";
import dropped from "../assets/1828939.png";
import readed from "../assets/open-book.png";
import styled from 'styled-components';

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
      .then(response => {
        setAlert(true);
      })
    } else {
      return navigate("/login")
    }
  }
  const FlexWrapper = styled.div`
    display: flex;
    justify-content:center;
    position:relative;
  `
  const ReviewCard = styled.div`
  background-color:#FFE7CB;
  position: relative;
  top:80px;
  left:auto;
  right:auto;
  width:40%;
  height:220px;
  border-radius:10px;
  border: solid rgb(0, 0, 0) 1px;
  display: block;
  margin:0 auto;
  margin-bottom:10px;
  `
  const ParagraphWrapper = styled.p`
  align-items: center;
  justify-content: center;
  text-align: center;
  text-shadow: -1px 4px 5px rgb(255, 255, 255);
  `
  const ParagraphAuthor = styled.p`
  position: relative;
  top:20px;
  `
  const ParagraphReview = styled.p`
  position: relative;
  top:30px;
  `
  const ParagraphDescription = styled.p`
  position: relative;
  top:40px;
  `
  const TitleBook = styled.h3`
  position: relative;
  top:30px;
  font-family: 'Manrope', sans-serif;
  text-align:center;
  `
  const ParagraphBook = styled.p`
  font-family: 'Manrope', sans-serif;
  position: relative;
  top:40px;
  text-align: center;
  `
  const BookCoverImg = styled.img`
  position: relative;
  top:40px;
  padding-right:70%;
  width:25%;
  height:15%;
  `
  const ButtonBook = styled.button`
  background-color: rgba(255, 255, 255, 0.774); 
  color: rgb(0, 0, 0); 
  padding: 10px 24px;
  cursor: pointer;
  border:none; 
  outline:none;
  `
  const WrapperButton = styled.div`
  display: inline-block;
  position: relative;
  top:50px;
  left:6.5%;
  background-color:rgb(199, 199, 199);
  border-radius: 10px;
  &:hover ${ButtonBook} {
    background-color: rgb(255, 213, 122);
  }
  `
  const Wrapper = styled.div` 
  `
  const ImgButton = styled.img`
  width:30px;
  height:30px;
  `
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
