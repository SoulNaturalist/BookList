import React from 'react';
import axios from "axios";
import useSWR from 'swr';
import {useParams} from "react-router-dom";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import planned from "../assets/realtime-protection.png";
import dropped from "../assets/1828939.png";
//import readed from "../assets/open-dataBook.png";

function DataBookPage () {
  const { slug } = useParams();
  const [AlertSuccess,setAlert] = React.useState(false);
  const [currentUser, setUser] = React.useState(false);
  const navigate = useNavigate();
  const { dataBook } = useSWR('http://127.0.0.1:3030/api/get_book_by_slug', (apiURL) => fetch(apiURL,{method: "post",headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'},
        credentials: 'include',body: JSON.stringify({slug:slug})
  }).then(res => res.json()));
  const { dataAuth } = useSWR('http://127.0.0.1:3030/api/auth', (apiURL) => fetch(apiURL,{method: "post",headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'},
        credentials: 'include'
  }).then(res => res.json()));
  function addBook(status) {
    if (Boolean(dataAuth.auth_data)) {
      let formatBook = { ...dataBook };
      axios({method: 'post',url:`http://127.0.0.1:3030/api/add_book`,withCredentials: true, headers: {},data: {
        book_name:formatBook.book_name,book_author:formatBook.book_author,year_of_release:formatBook.year_of_release,
        book_status:status,cover:formatBook.cover,slug:formatBook.slug
      }})
      .then(res => setAlert(true));
    } else {
      return navigate("/login")
    }
  }
  return dataBook ? <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress disableShrink /></div>:
  <div>
    <h3 className="title_book">{dataBook.book_name} {dataBook.book_author}</h3>
    <p className="description_book">{dataBook.description}</p>
    <img className="book_cover" src={dataBook.cover} alt="cover"/>
    <div className="btn-group">
      <button onClick={() => addBook("readed")}>
        {/* <img src={readed} width="30px"height="30px" alt="readed_icon"/> */}
      </button>
      <button onClick={() => addBook("drop")}>
        <img src={dropped} width="30px" height="30px" alt="drop_icon"/>
      </button>
      <button onClick={() => addBook("planned")}>
        <img src={planned} width="30px" height="30px" alt="planned_icon"/>
      </button>
    </div>
    {AlertSuccess ?  <Alert severity="success" style={{width:"20%",margin:"0 auto"}} className="alert_success">Книга добавлена!</Alert> : ""}
      {dataBook && dataBook.reviews ? [dataBook.reviews].map((data, key) => (
        Object.keys(data).map((review, key) => (
          <div className="review_card" key={key}>
            <div className="paragraph_wrapper">
              <p className="author_review">{Object.keys(data)}</p>
              <p className="title_review">{data[review].title}</p>
              <p className="description_review">{data[review].description}</p>
            </div>
          </div>
        ))
      )):""}
  </div>
}

export default DataBookPage;
