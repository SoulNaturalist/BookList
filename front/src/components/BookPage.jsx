import React from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

function BookPage () {
  const { slug } = useParams();
  const [Book,setBook] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [Error,setError] = React.useState(false);
  React.useEffect(() => {
    axios({method: 'post',url:`http://127.0.0.1:3030/api/get_book_by_slug`,withCredentials: true, headers: {},data: {slug:slug}})
    .then(response => {
      setBook(response.data)
      setLoading(false)
    })
    .catch(err => {setError(err)})

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
      console.log(response)
    })
    .catch(err => {console.log(err)})
  }
  return <div>
    <h3 className="title_book">{Book.book_name} {Book.book_author}</h3>
    <p className="description_book">{Book.description}</p>
    <img className="book_cover" src={Book.cover} alt="cover"/>
    <div className="btn-group">
      <button onClick={() => addBook("readed")}>Прочитана</button>
      <button onClick={() => addBook("planned")}>Запланирована</button>
      <button onClick={() => addBook("abandoned")}>Брошена</button>
    </div>
  </div>
}

export default BookPage;
