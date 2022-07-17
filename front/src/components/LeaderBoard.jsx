import React from 'react';
import axios from "axios";
import { styled } from '@mui/system';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';



function LeaderBoard () {
    const [users, setUsers] = React.useState("");
    const [textTitle, setTextTitle] = React.useState("");
    const CustomButtonRoot = styled('span')`
    font-family: IBM Plex Sans, sans-serif;
    font-weight: bold;
    font-size: 0.875rem;
    background-color: black;
    padding: 18px 70px;
    margin:20px;
    border-radius:5px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    border: none;

    &:hover {
        background-color: #FF7A00;
    }

    &.${buttonUnstyledClasses.active} {
        background-color: #ffb459;
    }

    &.${buttonUnstyledClasses.focusVisible} {
        box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
        outline: none;
    }
    `;
    function CustomButton(props) {
        return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
    }
    const GetDataLeaders = (typeLeader) => {
        if (typeLeader === "reviews") {
            axios({method: 'post',url:`http://127.0.0.1:3030/api/get_leaders`,withCredentials: true, headers: {},data: {type_leaders:"reviews"}})
            .then((res) => {
                setUsers(res.data)
                setTextTitle("Лучшие по количеству рецензий")
            })
        } else if (typeLeader === "books") {
            axios({method: 'post',url:`http://127.0.0.1:3030/api/get_leaders`,withCredentials: true, headers: {},data: {type_leaders:"books"}})
            .then((res) => {
                setUsers(res.data)
                setTextTitle("Лучшие по количеству книг")
            })
        }
    }
    const leaderTable = () => {
        return <div className="leaders_table">
            <h3>{textTitle}</h3>
            {Object.values(users).map((user, index) => {
                return <div key={index}>
                    <a href={`http://127.0.0.1:3000/user/${user.username }`}>
                        <img src={user.avatar} alt="avatar" className="leader_avatar"/>
                        <p className="leader_username">{user.username}</p>
                    </a>
                </div>
            })}
        </div>
    }
    
    return (
            <div>
                <div className="leader_title">
                    <h2>Топ пользователей</h2>
                </div>
                <div className="leader_menu">
                    <CustomButton onClick={() => GetDataLeaders("reviews")}>Рецензии</CustomButton>
                    <CustomButton onClick={() => GetDataLeaders("books")}>Книги</CustomButton>
                    <CustomButton onClick={() => GetDataLeaders("likes")}>Симпатии</CustomButton>
                </div>
                {users ? leaderTable():""}
            </div>
    );
    
}

export default LeaderBoard;