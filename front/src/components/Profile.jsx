import React from 'react';
import axios from 'axios';
import readed  from "../assets/readed.png";
import drop  from "../assets/abandoned.png";
import planned from "../assets/planned.png"
import reviews from "../assets/review.png"
import { styled } from '@mui/system';
import {useNavigate} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';

function Profile () {
    const [Data,setData] = React.useState("");
    const [Error,setError] = React.useState(false);
    const [loading,setLoading] = React.useState(false);
    const navigate = useNavigate("/");
    const blue = {
        500: '#000000',
        600: '#474646',
        700: '#474646',
    };
    const CustomButtonRoot = styled('span')`
    font-family: IBM Plex Sans, sans-serif;
    font-weight: bold;
    font-size: 0.875rem;
    background-color: ${blue[500]};
    padding: 12px 70px;
    margin-right:970px;
    margin-top:-140px;
    border-radius:5px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    border: none;

    &:hover {
        background-color: ${blue[600]};
    }

    &.${buttonUnstyledClasses.active} {
        background-color: ${blue[700]};
    }

    &.${buttonUnstyledClasses.focusVisible} {
        box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
        outline: none;
    }
    `;
    function CustomButton(props) {
        return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
    }
    React.useEffect(() => {
        axios({method: 'post',url:'http://127.0.0.1:3030/api/auth',withCredentials: true, headers: {}})
        .then(response => {
            setData(response.data)
            setLoading(true)
        })
        .catch(err => {setError(err)})
    }, [])
    const UserProfile = () => {
        if (Data.auth_data && !Error) {
            let readedCount = 0;
            let abandonedCount = 0;
            let plannedCount = 0;
            Object.getOwnPropertyNames(Data.auth_data.books).forEach(function(val) {
                let bookStatus = Data.auth_data.books[val].book_status;
                if (bookStatus === "readed") {
                    readedCount += 1;
                } else if (bookStatus === "abandoned") {
                    abandonedCount += 1;
                } else {
                    plannedCount += 1;
                }
            });
            const countReviews = Object.keys(Data.auth_data.reviews).length;
            return <div>
                <img src={Data.auth_data.avatar} className="user_avatar"/>
                <div className="text-block">
                    <br/>
                    <p className="username">{Data.auth_data.username}</p>
                    <p className="description">{Data.auth_data.status}</p>
                    <ul className="books_menu">
                        <a href="my_books_readed"><li>прочитано</li></a>
                        <a href="my_books_drop"><li>брошено</li></a>
                        <a href="my_books_planned"><li>запланировано</li></a>
                        <li>отзывы</li>
                    </ul>
                    <a href="my_books_readed"><img className="readed" src={readed} alt="readed"/></a>
                    <a href="my_books_drop"><img className="drop" src={drop} alt="drop"/></a>
                    <a href="my_books_planned"><img className="planned" src={planned} alt="planned"/></a>
                    <img className="reviews" src={reviews} alt="reviews"/>
                    <div className="count_block">
                        <p className="readed_count">{readedCount}</p>
                        <p className="drop_count">{abandonedCount}</p>
                        <p className="planned_count">{plannedCount}</p>
                        <p className="reviews_count">{countReviews}</p>
                    </div>
                    <a href="/change_profile"><CustomButton>Редактировать</CustomButton></a>
                </div>
            </div>
        } else {
            navigate("/login");
        }
    }
    return (
        <div>
            {loading ? UserProfile() : <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress disableShrink /></div>}
        </div>
  
)}
export default Profile;
