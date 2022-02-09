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
  return <div>
    <img className="book_cover" src={Book.cover}/>
    <div className="btn-group">
      <button>Прочитана</button>
      <button>Запланирована</button>
      <button>Брошена</button>
    </div>
  </div>
}

export default BookPage;
