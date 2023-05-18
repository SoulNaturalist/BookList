import React from 'react';
import useSWR from 'swr';
import {ButtonLeader, LeaderTitle, LeaderMenu, LeaderUsers, TitleLeaders, LeaderAvatar, LeaderUsername} from "../styles/LeaderBoard.styles";

function LeaderBoard () {
    const [textTitle, setTextTitle] = React.useState("");
    const [selectedLeader, setLeader] = React.useState("reviews");
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