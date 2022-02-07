import React, {Fragment} from 'react';
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
  useNavigate
} from "react-router-dom";


function BooksCatalog () {
    const [Data,setData] = React.useState("");
    const [Error,setError] = React.useState(false);
    const navigate = useNavigate("/");
    React.useEffect(() => {
        axios({method: 'post',url:'http://127.0.0.1:3030/api/auth',withCredentials: true, headers: {}})
        .then(response => {setData(response.data)})
        .catch(err => {setError(err)})
    }, [])
    const CheckAuth = () => {
        if (Data.auth_data && !Error) {
            return <div>
                <h1 className="title__catalog">Каталог книг</h1>
            </div>
        }
    }
    return (
        <div>{CheckAuth()}</div>
    );
    
}

export default BooksCatalog;