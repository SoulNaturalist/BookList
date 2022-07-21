import React from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/system';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import readed  from "../assets/readed.png";
import drop  from "../assets/abandoned.png";
import planned from "../assets/planned.png";
import reviews from "../assets/review.png"

function UserPage () {
    const { username } = useParams();
    const navigate = useNavigate("/");
    const [Data,setData] = React.useState([]);
    let [user,setUser] = React.useState([]);
    const [loading,setLoading] = React.useState(true);
    React.useEffect(() => {
        axios({method: 'post',url:'http://127.0.0.1:3030/api/auth',withCredentials: true, headers: {}})
        .then(response => {
            setData(response.data.auth_data);
        })
        .catch(() => {
            navigate("/login");
        })
    }, []);
    React.useEffect(() => {
        axios({method: 'get',url:`http://127.0.0.1:3030/api/user/${username}`,withCredentials: true, headers: {}})
        .then(response => {
            setUser(response.data);
            setLoading(false);
        })
    }, [username]);
    const blue = {
        500: '#000000',
        600: '#474646',
        700: '#474646',
    };
    const CustomButtonMsg = styled('span')`
    font-family: IBM Plex Sans, sans-serif;
    font-weight: bold;
    font-size: 0.875rem;
    background-color: ${blue[500]};
    padding: 12px 70px;
    position:relative;
    top:-540px;
    left:110px;
    float:left;
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
    const CustomButtonChange = styled('span')`
    font-family: IBM Plex Sans, sans-serif;
    font-weight: bold;
    font-size: 0.875rem;
    background-color: ${blue[500]};
    padding: 12px 70px;
    position:relative;
    top:-540px;
    left:100px;
    float:left;
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
    function ButtonMsg(props) {
        return <ButtonUnstyled {...props} component={CustomButtonMsg} />;
    }
    function ButtonChange(props) {
        return <ButtonUnstyled {...props} component={CustomButtonChange} />;
    }
    
    const UserProfile = () => {
        if (user?.length && Data) {
            user = user[0];
            let readedCount = 0;
            let abandonedCount = 0;
            let plannedCount = 0;
            Object.getOwnPropertyNames(user.books).forEach(function(val) {
                let bookStatus = user.books[val].book_status;
                if (bookStatus === "readed") {
                    readedCount += 1;
                } else if (bookStatus === "drop") {
                    abandonedCount += 1;
                } else {
                    plannedCount += 1;
                }
            });
            const countReviews = Object.keys(user.reviews).length;
            return <div>
                <img src={user.avatar} className="user_avatar" alt="avatar"/>
                <div className="description-block" style={{  backgroundImage: `url(${user.bg})`, backgroundPosition:'center'}}>
                    <br/>
                    <p className="username">{user.username}</p>
                    <p className="description">{user.status}</p>
                </div>
                <ul className="books_menu">
                    <a href="my_books_readed"><li>прочитано</li></a>
                    <a href="my_books_drop"><li>брошено</li></a>
                    <a href="my_books_planned"><li>запланировано</li></a>
                    <li>отзывы</li>
                </ul>
                <div className="books_icons">
                    <a href={`/${username}/books_readed`}><img className="readed" src={readed} alt="readed"/></a>
                    <a href={`/${username}/books_drop`}><img className="drop" src={drop} alt="drop"/></a>
                    <a href={`/${username}/books_planned`}><img className="planned" src={planned} alt="planned"/></a>
                    <img className="reviews" src={reviews} alt="reviews"/>
                </div>
                <div className="count_block">
                    <p className="readed_count">{readedCount}</p>
                    <p className="drop_count">{abandonedCount}</p>
                    <p className="planned_count">{plannedCount}</p>
                    <p className="reviews_count">{countReviews}</p>
                </div>
                {Data && Data.username === username ? <a href="/change_profile"><ButtonChange>Редактировать</ButtonChange></a>:<ButtonMsg>Написать</ButtonMsg>}

            </div>
            } else {
                return Data ? <h1 className="title__user_error">Пользователя с никнеймом {username} не существует!</h1>:navigate("/login")
            }
    }
    return (

        <div>
            {loading ? "":UserProfile()}
        </div>
    );
    
}

export default UserPage;