import React from 'react';
import axios from "axios";
import styled from 'styled-components';
import {useParams, useNavigate} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';


function UserBooks () {
    const { _type, username } = useParams();
    const navigate = useNavigate("/");
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
    const ParagraphBook = styled.p`
    position:relative;
    top:20px;
    text-align: center;
    font-family: 'Manrope', sans-serif;
    font-size:30px;
    `
    const FlexWrapper = styled.div`
    display:flex;
    justify-content:center;
    `
    const ParagraphBookName = styled.p`
    font-size:20px;
    text-align:center;
    `
    const ImgCover = styled.img`
    width:auto;
    height:20%;
    display:block;
    margin:auto;
    padding:10px;
    `
    const checkType = () => {
        if (Data) {
            if (_type === "_readed") {
                return <ParagraphBook>{user.username} прочитанные книги</ParagraphBook>
            } else if (_type === "_drop") {
                return <ParagraphBook>{user.username} брошенные книги</ParagraphBook>
    
            } else if (_type === "_planned") {
                return <ParagraphBook>{user.username} запланированные книги</ParagraphBook>
            }
        }
    }
    const checkStatusBook = (status, book) => {
        if (book.book_status === status.split("_")[1]) {
            return true;
        }
        return false;
    }
    return (
        <div>
            {Data ? checkType():navigate("/login")}
            <br/>
            {loading ? Object.keys(user.books).map((book,index) => (
                <div key={index}>
                    {checkStatusBook(_type, Object.values(user.books)[index]) ? <div>
                        <a href={`http://127.0.0.1:3000/book/${Object.values(user.books)[index].slug}`}>
                            <ImgCover src={Object.values(user.books)[index].cover} alt="cover"/>
                            <ParagraphBookName>{book}</ParagraphBookName>
                        </a>
                    </div>:""}
                </div>
            )):<FlexWrapper><CircularProgress disableShrink /></FlexWrapper>}
        </div>
    );
}
export default UserBooks;