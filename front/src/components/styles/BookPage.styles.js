import styled, { keyframes } from "styled-components";

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  top: 350px;
`;
export const ReviewCard = styled.div`
  background-color: #ffe7cb;
  position: relative;
  top: 80px;
  left: auto;
  right: auto;
  width: 40%;
  height: 220px;
  border-radius: 10px;
  border: solid rgb(0, 0, 0) 1px;
  display: block;
  margin: 0 auto;
  margin-bottom: 10px;
`;
export const ParagraphWrapper = styled.p`
  align-items: center;
  justify-content: center;
  text-align: center;
  text-shadow: -1px 4px 5px rgb(255, 255, 255);
`;
export const ParagraphAuthor = styled.p`
  position: relative;
  top: 20px;
`;
export const ParagraphReview = styled.p`
  position: relative;
  top: 30px;
`;
export const ParagraphDescription = styled.p`
  position: relative;
  top: 40px;
`;
export const TitleBook = styled.h3`
  position: relative;
  top: 30px;
  font-family: "Manrope", sans-serif;
  text-align: center;
`;
export const ParagraphBook = styled.p`
  font-family: "Manrope", sans-serif;
  position: relative;
  top: 40px;
  text-align: center;
`;
export const BookCoverImg = styled.img`
  position: relative;
  top: 40px;
  left: 10px;
  width: 25%;
  height: 15%;
  border-radius: 10px;
`;
export const ButtonBook = styled.button`
  background-color: rgba(255, 255, 255, 0.774);
  color: rgb(0, 0, 0);
  padding: 10px 24px;
  cursor: pointer;
  border: none;
  outline: none;
`;
export const WrapperButton = styled.div`
  display: inline-block;
  position: relative;
  top: 50px;
  left: 6.5%;
  background-color: rgb(199, 199, 199);
  border-radius: 10px;
  &:hover ${ButtonBook} {
    background-color: rgb(255, 213, 122);
  }
`;
export const Wrapper = styled.div``;
export const ImgButton = styled.img`
  width: 30px;
  height: 30px;
`;

export const SpanBadgeStyles = styled.span`
  background-color: #ebecf0;
  border-radius: 2em;
  color: #172b4d;
  display: inline-block;
  font-size: 12;
  font-weight: normal;
  line-height: 1;
  min-width: 1;
  padding: 0.16666666666667em 0.5em;
  text-align: center;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const BookReviewCard = styled.div`
  position: relative;
  z-index: 1000;
`;

export const ReviewText = styled.p`
  text-align: center;
  font-size: 19px;
  font-family: "Manrope", sans-serif;
  position: relative;
  top: 150px;
  color: #000;
`;
