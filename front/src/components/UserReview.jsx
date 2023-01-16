import React from 'react'
import axios from "axios";
import Rating from '@mui/material/Rating';
import {useParams, useNavigate} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

export default function UserReview () {
    const navigate = useNavigate("/");
    const { username } = useParams();
    const [Data,setData] = React.useState({});
    const [user,setUser] = React.useState([]);
    const [loading,setLoading] = React.useState(false);
    React.useEffect(() => {
        axios({method: 'post',url:'http://127.0.0.1:3030/api/auth',withCredentials: true, headers: {}})
        .then(response => {
            setData(response.data)
        })
    }, [])
    React.useEffect(() => {
        axios({method: 'get',url:`http://127.0.0.1:3030/api/user/${username}`,withCredentials: true, headers: {}})
        .then(response => {
            setUser(response.data[0])
            setLoading(true)
        })
    }, [username])
    return <div>
        <h1 className="title_reviews_user">Рецензии {username}</h1>
        {
            Data ?
            loading ? Object.keys(user.reviews).map((review,index) => (
                <div key={index} className="review_card_profile">
                    <h1 className="book_name_review">{review}</h1>
                    <p className="book_title_review">{user.reviews[review].title}</p>
                    <p className="book_description_review">{user.reviews[review].description}</p>
                    <Rating name="read-only" value={user.reviews[review].rating} readOnly/>
                </div>
            )):<div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress disableShrink /></div>:navigate("/login")
        }
        </div>
}