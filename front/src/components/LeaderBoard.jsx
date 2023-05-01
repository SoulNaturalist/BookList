import React from 'react';
import { styled } from '@mui/system';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import useSWR from 'swr';

function LeaderBoard () {
    const [textTitle, setTextTitle] = React.useState("");
    const [selectedLeader, setLeader] = React.useState("reviews");

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
        return <div className="leaders_table">
            <h3>{textTitle}</h3>
            {Object.values(users).map((user, index) => {
                return <div key={index}>
                    <a href={`http://127.0.0.1:3000/user/${user.username}`}>
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
                <CustomButton onClick={() => GetDataLeaders("рецензий")}>Рецензии</CustomButton>
                <CustomButton onClick={() => GetDataLeaders("книг")}>Книги</CustomButton>
                <CustomButton onClick={() => GetDataLeaders("симпатий")}>Симпатии</CustomButton>
            </div>
            {users ? leaderTable() : ""}
        </div>
    );
}

export default LeaderBoard;