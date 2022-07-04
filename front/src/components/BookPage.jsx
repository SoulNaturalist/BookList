import React from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

function BookPage (props) {
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
    delete formatBook.slug;
    axios({method: 'post',url:`http://127.0.0.1:3030/api/add_book`,withCredentials: true, headers: {},data: {
      book_name:formatBook.book_name,book_author:formatBook.book_author,year_of_release:formatBook.year_of_release,
      book_status:status,cover:formatBook.cover
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
    <select className="select_book" onChange={(e) => addBook(e.target.value)}>
      <option value="readed">Прочитана</option>
      <option value="planned">Запланирована</option>
      <option value="drop">Брошена</option>
    </select>
      {AlertSuccess ?  <Alert severity="success" style={{width:"20%",margin:"0 auto"}} className="alert_success">Книга добавлена!</Alert> : ""}
      {AlertError ? <Alert severity="error" style={{width:"20%",margin:"0 auto"}} className="alert_error">Вы не авторизованы!</Alert> :  ""}
  </div>
}

export default BookPage;
