import React from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import readed  from "../assets/readed.png";
import drop  from "../assets/abandoned.png";
import planned from "../assets/planned.png";
import reviews from "../assets/review.png";
import {BooksUl, ButtonChange, ButtonMsg, ImgAvatar, 
    BookMenuLi, DescriptionDiv, UsernameParagraph, DescriptionParagraph, IconsWrapper, 
    IconImg, CountWrapper, CountParagraph, TitleError, FlexWrapper
} from "./styles/UserPage.styles";

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
                <ImgAvatar src={user.avatar} className="user_avatar" alt="avatar"/>
                <DescriptionDiv style={{  backgroundImage: `url(${user.bg})`, backgroundPosition:'center'}}>
                    <br/>
                    <UsernameParagraph>{user.username}</UsernameParagraph>
                    <DescriptionParagraph>{user.status}</DescriptionParagraph>
                </DescriptionDiv>
                <BooksUl>
                    <a href="my_books_readed"><BookMenuLi>прочитано</BookMenuLi></a>
                    <a href="my_books_drop"><BookMenuLi>брошено</BookMenuLi></a>
                    <a href="my_books_planned"><BookMenuLi>запланировано</BookMenuLi></a>
                    <BookMenuLi>отзывы</BookMenuLi>
                </BooksUl>
                <IconsWrapper>
                    <a href={`http://127.0.0.1:3000/user/${username}/books_readed`}><IconImg src={readed} alt="readed"/></a>
                    <a href={`http://127.0.0.1:3000/user/${username}/books_drop`}><IconImg className="drop" src={drop} alt="drop"/></a>
                    <a href={`http://127.0.0.1:3000/user/${username}/books_planned`}><IconImg className="planned" src={planned} alt="planned"/></a>
                    <a href={`http://127.0.0.1:3000/user/${username}/reviews`}><IconImg className="reviews" src={reviews} alt="reviews"/></a>
                </IconsWrapper>
                <CountWrapper>
                    <CountParagraph>{readedCount}</CountParagraph>
                    <CountParagraph>{abandonedCount}</CountParagraph>
                    <CountParagraph>{plannedCount}</CountParagraph>
                    <CountParagraph>{countReviews}</CountParagraph>
                </CountWrapper>
                {Data && Data.username === username ? <a href="/change_profile"><ButtonChange>Редактировать</ButtonChange></a>:<ButtonMsg>Написать</ButtonMsg>}

            </div>
            } else {
                return Data ? <TitleError>Пользователя с никнеймом {username} не существует!</TitleError>:navigate("/login")
            }
    }
    return (

        <div>
            {loading ? <FlexWrapper><CircularProgress disableShrink /></FlexWrapper>:UserProfile()}
        </div>
    );
    
}
export default UserPage;