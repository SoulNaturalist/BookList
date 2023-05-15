import styled, {keyframes} from "styled-components";

export const Input = styled.input`
    color:white;
    background-color: #000; 
    display: block;
    box-sizing: border-box;
    padding:20px;
    width:300px;
    margin-bottom:20px;
    font-size:18px;
    outline:none;
    border-radius:10px;
`;
export const FormWrapper = styled.div`
    padding: 50px;
    position: fixed; top: 50%; left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`;
export const buttonClickAnimation = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(0.9);
    }
    100% {
        transform: scale(1);
    }
`;
export const ResetButton = styled.input`
    color:black;
    display: block;
    box-sizing: border-box;
    padding:15px;
    width:300px;
    font-size:18px;
    outline:none;
    border-radius:10px;
    background-color:#ffb54d;
    border:none;
    &:active {
        animation: ${buttonClickAnimation} 0.2s ease-in-out;
    }
`;
export const MainTitle = styled.h2`
    font-family: 'Manrope', sans-serif;
    text-align: center;
    position:relative;
    top:240px;
`;
export const ErrorAlert = styled.div`
    -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 4px;
    box-shadow: none;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.43;
    letter-spacing: 0.01071em;
    background-color: #d32f2f;
    display: -webkit-box;
    display: -webkit-flex;
    position: relative;
    display: -ms-flexbox;
    display: flex;
    padding: 10px 16px;
    color: #fff;
    top: -33px;
`;
export const SuccessAlert = styled.div`
    -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 4px;
    box-shadow: none;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.43;
    letter-spacing: 0.01071em;
    background-color:#a3ff73;
    display: -webkit-box;
    display: -webkit-flex;
    position: relative;
    display: -ms-flexbox;
    display: flex;
    padding: 10px 16px;
    color: #000;
    top: -33px;
`;