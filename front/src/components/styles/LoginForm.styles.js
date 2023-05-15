import styled from "styled-components";

export const FormWrapper = styled.div`
    padding: 50px;
    position: fixed; top: 50%; left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`;
export const LoginButton = styled.button`
    display:block;
    margin:auto;
    position:relative;
    top:10px;
    appearance: none;
    background: rgb(0, 0, 0);
    color: white;
    border: none;
    padding: 15px 20px;
    border-radius: 4px;
    -webkit-appearance: none;
    color: white;
    font-size: 16px;
    cursor:pointer;
`;
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
export const LinkCreateAcc = styled.a`
    font-family: 'Manrope', sans-serif;
    position:relative;
    left:10px;
    top:-3px;
`;