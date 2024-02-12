import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin:0;
        padding:0;
    }

    a {
        color:black;
        text-decoration: none;
    }

    ul {
        list-style-type: none;
    }

    ::placeholder {
        color: rgb(255, 255, 255);
        opacity: 1;
        font-family: 'Manrope', sans-serif;
    }
    
    p {
        font-family: 'Manrope', sans-serif;
    }
    
    label {
        line-height: 2;
        text-align: left;
        display: block;
        margin-bottom: 13px;
        margin-top: 20px;
        color: white;
        font-size: 14px;
        font-weight: 200;
    }
`;

export default GlobalStyle;
