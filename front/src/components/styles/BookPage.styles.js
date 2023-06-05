import styled, { keyframes } from 'styled-components';

export const FlexWrapper = styled.div`
    display: flex;
    justify-content:center;
    position:relative;
`;
export const ReviewCard = styled.div`
  background-color:#FFE7CB;
  position: relative;
  top:80px;
  left:auto;
  right:auto;
  width:40%;
  height:220px;
  border-radius:10px;
  border: solid rgb(0, 0, 0) 1px;
  display: block;
  margin:0 auto;
  margin-bottom:10px;
`;
export const ParagraphWrapper = styled.p`
  align-items: center;
  justify-content: center;
  text-align: center;
  text-shadow: -1px 4px 5px rgb(255, 255, 255);
`;
export const ParagraphAuthor = styled.p`
  position: relative;
  top:20px;
`;
export const ParagraphReview = styled.p`
  position: relative;
  top:30px;
`;
export const ParagraphDescription = styled.p`
  position: relative;
  top:40px;
`;
export const TitleBook = styled.h3`
  position: relative;
  top:30px;
  font-family: 'Manrope', sans-serif;
  text-align:center;
`;
export const ParagraphBook = styled.p`
  font-family: 'Manrope', sans-serif;
  position: relative;
  top:40px;
  text-align: center;
`;
export const BookCoverImg = styled.img`
  position: relative;
  top:40px;
  padding-right:70%;
  width:25%;
  height:15%;
`;
export const ButtonBook = styled.button`
  background-color: rgba(255, 255, 255, 0.774); 
  color: rgb(0, 0, 0); 
  padding: 10px 24px;
  cursor: pointer;
  border:none; 
  outline:none;
`;
export const WrapperButton = styled.div`
  display: inline-block;
  position: relative;
  top:50px;
  left:6.5%;
  background-color:rgb(199, 199, 199);
  border-radius: 10px;
  &:hover ${ButtonBook} {
    background-color: rgb(255, 213, 122);
  }
`;
export const Wrapper = styled.div` 
`;
export const ImgButton = styled.img`
  width:30px;
  height:30px;
`;


export const SpanBadgeStyles = styled.span`
  background-color:#EBECF0;
  border-radius:2em;
  color:#172B4D;
  display:inline-block;
  font-size:12;
  font-weight:normal;
  line-height:1;
  min-width:1;
  padding:0.16666666666667em 0.5em;
  text-align:center;
`;

export const GroupStylesWrapper = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
`;

export const SelectWrapper = styled.div`
  width:10%;
  position:relative;
  left:150px;
  top:60px;
`;

export const hideAlertAnimation = keyframes`
    from{
      opacity: 1;
    }
    to{
      opacity: 0;
    }
`;

export const AlertSuccessBook = styled.div`
  animation ${hideAlertAnimation};
  animation-duration: 5s;
  animation-fill-mode: forwards;
  width:20%; 
  margin:0 auto;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: none;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  background-color: rgb(237, 247, 237);
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 6px 16px;
  color: rgb(30, 70, 32);
`