import React from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import Alert from '@mui/material/Alert';

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
  }, [])
  
  function addBook(status) {
    let formatBook = { ...Book };
    delete formatBook.reviews;
    delete formatBook.slug;
    delete formatBook.cover;
    axios({method: 'post',url:`http://127.0.0.1:3030/api/add_book`,withCredentials: true, headers: {},data: {
      book_name:formatBook.book_name,book_author:formatBook.book_author,year_of_release:formatBook.year_of_release,
      book_status:status
    }})
    .then(response => {
      setAlert(true)
    })
    .catch(err => {setError(err)})
  }
  return <div>
    <h3 className="title_book">{Book.book_name} {Book.book_author}</h3>
    <p className="description_book">{Book.description}</p>
    <img className="book_cover" src={Book.cover} alt="cover"/>
    <div className="btn-group">
      <button onClick={() => addBook("readed")} className="btn_read">Прочитана</button>
      <button onClick={() => addBook("planned")} className="btn_planned">Запланирована</button>
      <button onClick={() => addBook("abandoned")} className="btn_abandoned">Брошена</button>
      {AlertSuccess ?  <Alert severity="success" style={{width:"20%",margin:"0 auto"}} className="alert_success">Книга добавлена!</Alert> : ""}
      {AlertError ? <Alert severity="error" style={{width:"20%",margin:"0 auto"}} className="alert_error">Что-то пошло не так!</Alert> :  ""}
    </div>
  </div>
}

export default BookPage;
