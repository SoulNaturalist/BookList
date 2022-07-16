import React from 'react';
import axios from "axios";
import { styled } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';



function LeaderBoard () {
    const [loading, setLoading] = React.useState(true);
    const [users, SetUsers] = React.useState("");
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
    const leadersComponent = (typeLeader) => {
        if (typeLeader === "reviews") {

        } else if (typeLeader === "books") {

        } else {

        }

    }
    
    return (
            <div>
                <div className="leader_title">
                    <h2>Топ пользователей</h2>
                </div>
                <div className="leader_menu">
                    <CustomButton onClick={() => leadersComponent("reviews")}>Рецензии</CustomButton>
                    <CustomButton onClick={() => leadersComponent("books")}>Книги</CustomButton>
                    <CustomButton onClick={() => leadersComponent("likes")}>Симпатии</CustomButton>
                </div>
            </div>
    );
    
}

export default LeaderBoard;