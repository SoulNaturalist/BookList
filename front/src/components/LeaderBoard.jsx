import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

function LeaderBoard () {
    const [textTitle, setTextTitle] = React.useState("");
    const [selectedLeader, setLeader] = React.useState("reviews");

    const ButtonLeader = styled('span')`
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
    &.active {
        background-color: #ffb459;
    }
    &.focusVisible {
         box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
        outline: none;
    }
    `;
    const LeaderTitle = styled('div')`
    font-family: 'Manrope', sans-serif;
    text-align: center;
    position: relative;
    top:50px;
    `;
    const LeaderMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top:100px;
    `;
    const LeaderUsers = styled.div`
    background-color:rgb(255, 255, 255);
    width:834px;
    height:466px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    top:120px;
    border-radius:10px;
    -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    `;
    const TitleLeaders = styled.h2`
    font-family: 'Manrope', sans-serif;
    text-align: center;
    position: relative;
    top:15px;
    `;
    const LeaderAvatar = styled.img`
    border-radius:150px;
    width:80px;
    padding:20px;
    display:block;
    margin:auto;
    `;
    const LeaderUsername = styled.p`
    position: relative;
    text-align: center;
    `;

    const GetDataLeaders = (typeLeader) => {
        const leaderObj = {"рецензий":"reviews", "симпатий":"likes", "книг":"books"};
        setLeader(leaderObj[typeLeader]);
        setTextTitle(`Лучшие по количеству ${typeLeader}`);
    };

    const { data: users } = useSWR(
        'http://127.0.0.1:3030/api/get_leaders',
        (url) =>
          fetch(url, {
            method: 'POST',
            withCredentials: true,
            headers: {},
            body: JSON.stringify({ type_leaders: selectedLeader }),
          }).then((res) => res.json()),
          { revalidateOnFocus: true, refreshInterval: 500 },
    );

    const leaderTable = () => {
        return <LeaderUsers>
            <TitleLeaders>{textTitle}</TitleLeaders>
            {Object.values(users).map((user, index) => {
                return <div key={index}>
                    <a href={`http://127.0.0.1:3000/user/${user.username}`}>
                        <LeaderAvatar src={user.avatar} alt="avatar"/>
                        <LeaderUsername>{user.username}</LeaderUsername>
                    </a>
                </div>
            })}
        </LeaderUsers>
    }
    return (
        <div>
            <LeaderTitle>
                <h2>Топ пользователей</h2>
            </LeaderTitle>
            <LeaderMenu>
                <ButtonLeader onClick={() => GetDataLeaders("рецензий")}>Рецензии</ButtonLeader>
                <ButtonLeader onClick={() => GetDataLeaders("книг")}>Книги</ButtonLeader>
                <ButtonLeader onClick={() => GetDataLeaders("симпатий")}>Симпатии</ButtonLeader>
            </LeaderMenu>
            {users ? leaderTable() : ""}
        </div>
    );
}

export default LeaderBoard;