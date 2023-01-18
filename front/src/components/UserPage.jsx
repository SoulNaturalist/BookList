import React from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
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
    const BooksUl = styled.ul`
    justify-content: center;
    display: flex;
    position: relative;
    top:-180px;
    `
    const ButtonChange = styled.button`
    font-family: IBM Plex Sans, sans-serif;
    font-weight: bold;
    font-size: 0.875rem;
    background-color: #000000;
    padding: 12px 70px;
    position:relative;
    top:-500px;
    left:100px;
    float:left;
    border-radius:5px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    border: none;
    &:hover {
        background-color: #474646;
    }
    `
    const ButtonMsg = styled.button`
    font-family: IBM Plex Sans, sans-serif;
    font-weight: bold;
    font-size: 0.875rem;
    background-color: #000000;
    padding: 12px 70px;
    position:relative;
    top:-500px;
    left:110px;
    float:left;
    border-radius:5px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    border: none;
    &:hover {
        background-color:#474646;
    }
    `
    const ImgAvatar = styled.img`
    width:299px;
    height:275px;
    margin-top:80px;
    margin-left:70px;
    border: 2px solid #000000;
    border-radius:5px;
    `
    const BookMenuLi = styled.li`
    color:black;
    padding:35px 35px 5px;
    font-family: 'Manrope', sans-serif;
    `
    const DescriptionDiv = styled.div`
    width:700px;
    height:150px;
    background-color:rgb(0, 0, 0);
    margin-left:auto;
    margin-right:auto;
    position: relative;
    top:-200px;
    border-radius:10px;
    `
    const UsernameParagraph = styled.p`
    text-align:center;
    font-size:25px;
    color:white;
    `
    const DescriptionParagraph = styled.p`
    color:white;
    text-align:center;
    margin-top:10px;
    `
    const IconsWrapper = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    top:-230px;
    `
    const IconImg = styled.img`
    margin:53px;
    position: relative;
    `
    const CountWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    position: relative;
    top:-330px;
    left:4px;
    ` 
    const CountParagraph = styled.p`
    margin:62px;
    padding:5px 1% 5px 5px;
    `
    const TitleError = styled.h1`
    text-align: center;
    font-family: 'Manrope', sans-serif;
    position: relative;
    top:70px;
    `
    const FlexWrapper = styled.div`
    display: flex;
    justify-content:center;
    position:relative;
    top: 90px;
    `
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