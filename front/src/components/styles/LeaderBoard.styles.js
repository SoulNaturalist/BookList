import styled from 'styled-components';

export const ButtonLeader = styled('span')`
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
export const LeaderTitle = styled('div')`
    font-family: 'Manrope', sans-serif;
    text-align: center;
    position: relative;
    top:50px;
`;
export const LeaderMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top:100px;
`;
export const LeaderUsers = styled.div`
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
export const TitleLeaders = styled.h2`
    font-family: 'Manrope', sans-serif;
    text-align: center;
    position: relative;
    top:15px;
`;
export const LeaderAvatar = styled.img`
    border-radius:150px;
    width:80px;
    padding:20px;
    display:block;
    margin:auto;
`;
export const LeaderUsername = styled.p`
    position: relative;
    text-align: center;
`;