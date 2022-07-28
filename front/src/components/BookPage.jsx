import React from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import planned from "../assets/realtime-protection.png";
import dropped from "../assets/1828939.png";
import readed from "../assets/open-book.png";

function BookPage () {
  const { slug } = useParams();
  const [Book,setBook] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [AlertError,setError] = React.useState(false);
  const [AlertSuccess,setAlert] = React.useState(false);
  React.useEffect(() => {
    axios({method: 'post',url:`http://127.0.0.1:3030/api/get_book_by_slug`,withCredentials: true, headers: {},data: {slug:slug}})
    .then(response => {
      setBook(response.data)
      setLoading(false)
    })
  }, [slug])
  
  function addBook(status) {
    let formatBook = { ...Book };
    delete formatBook.reviews;
    axios({method: 'post',url:`http://127.0.0.1:3030/api/add_book`,withCredentials: true, headers: {},data: {
      book_name:formatBook.book_name,book_author:formatBook.book_author,year_of_release:formatBook.year_of_release,
      book_status:status,cover:formatBook.cover,slug:formatBook.slug
    }})
    .then(response => {
      setAlert(true);
    })
    .catch(err => {setError(err)})
  }
  return loading ? <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress disableShrink /></div>:
  <div>
    <h3 className="title_book">{Book.book_name} {Book.book_author}</h3>
    <p className="description_book">{Book.description}</p>
    <img className="book_cover" src={Book.cover} alt="cover"/>
    <div className="btn-group">
      <button onClick={() => addBook("readed")}>
        <img src={readed} width="30px"height="30px" alt="readed_icon"/>
      </button>
      <button onClick={() => addBook("drop")}>
        <img src={dropped} width="30px" height="30px" alt="drop_icon"/>
      </button>
      <button onClick={() => addBook("planned")}>
        <img src={planned} width="30px" height="30px" alt="planned_icon"/>
      </button>
    </div>
    {AlertSuccess ?  <Alert severity="success" style={{width:"20%",margin:"0 auto"}} className="alert_success">Книга добавлена!</Alert> : ""}
    {AlertError ? <Alert severity="error" style={{width:"20%",margin:"0 auto"}} className="alert_error">Вы не авторизованы!</Alert> :  ""}
  </div>
}

export default BookPage;
