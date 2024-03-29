import styled from "styled-components";

export const TitleCatalog = styled.h1`
  text-align: center;
  margin-top: 130px;
  font-family: "Manrope", sans-serif;
`;
export const SearchButton = styled.button`
  all: unset;
  cursor: pointer;
  background-color: rgb(101, 245, 166);
  width: 5%;
  height: 40px;
  text-align: center;
  color: rgb(0, 0, 0);
  position: relative;
  top: 0px;
  left: 71%;
  font-family: "Manrope";
  box-shadow: "0px 5px 5px -5px rgba(34, 60, 80, 0.6)";
  -webkit-box-shadow: 0px 5px 10px 2px rgba(143, 255, 146, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(143, 255, 146, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(143, 255, 146, 0.2);
`;

export const MobileSearchButton = styled.button`
  all: unset;
  cursor: pointer;
  background-color: rgb(101, 245, 166);
  width: 20%;
  height: 40px;
  text-align: center;
  color: rgb(0, 0, 0);
  position: relative;
  top: 0px;
  left: 71%;
  font-family: "Manrope";
  box-shadow: "0px 5px 5px -5px rgba(34, 60, 80, 0.6)";
  -webkit-box-shadow: 0px 5px 10px 2px rgba(143, 255, 146, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(143, 255, 146, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(143, 255, 146, 0.2);
`;

export const SearchInput = styled.input`
  display: block;
  position: relative;
  top: 40px;
  margin-right: auto;
  margin-left: auto;
  color: #000;
  width: 40%;
  border: 2px solid #000;
  padding: 10px 10px;
  line-height: 10px;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px #ff823d;
  }
`;

export const MobileSearchInput = styled.input`
  display: block;
  position: relative;
  top: 40px;
  margin-right: auto;
  margin-left: auto;
  color: #000;
  width: 35.2%;
  border: 2px solid #000;
  padding: 10px 10px;
  line-height: 10px;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px #ff823d;
  }
`;

export const BookCard = styled.div`
  position: relative;
  top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
export const CoverBook = styled.img`
  width: 10%;
  height: auto;
  margin: 5px;
`;
export const BookParagraph = styled.p`
  display: block;
  color: black !important;
  font-size: 20px;
  margin: 5px 0;
  width: 100px;
`;
export const HoverButton = styled.div`
  &:hover ${SearchButton} {
    background-color: rgb(255, 255, 255);
  }
`;
export const FlexWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position:relative;
  top:120px;
`;
export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  top: 150px;
`;

export const FlexEndWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
export const TopFlexWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position:relative;
  top:0px;
`;