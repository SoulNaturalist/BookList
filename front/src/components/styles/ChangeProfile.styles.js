import styled, { keyframes } from "styled-components";

export const MainTitle = styled.h2`
  font-family: "Manrope", sans-serif;
  text-align: center;
  position: relative;
  top: 160px;
`;
export const FormWrapper = styled.div`
  padding: 50px;
  position: fixed;
  top: 60%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;
export const InputWrapper = styled.input`
  background-color: #000;
  display: block;
  box-sizing: border-box;
  padding: 20px;
  width: 300px;
  margin-bottom: 20px;
  font-size: 18px;
  outline: none;
  border-radius: 10px;
  color: #ffffff;
  font-family: "Manrope", sans-serif;
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
export const SaveButton = styled.button`
  color: #000;
  background-color: #ffb54d;
  display: block;
  font-size: 18px;
  outline: none;
  width: 140px;
  height: 70px;
  margin: 0 auto;
  cursor: pointer;
  font-family: "Manrope", sans-serif;
  border: none;
  &:hover {
    background-color: #ff9f00;
  }
  &:active {
    animation: ${buttonClickAnimation} 0.2s ease-in-out;
  }
`;
