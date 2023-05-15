import styled from 'styled-components';

export const WrapperRules = styled.div`
    text-align: center;
    padding: 50px;
    position: fixed; top: 50%; left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`;
export const ParagraphRules = styled.p`
    position: relative;
    margin:5px;
    font-size: 20px;
    font-family: 'Manrope', sans-serif;
`;
export const TitleRules = styled.h2`
    font-size: 35px;
    font-family: 'Manrope', sans-serif;
`;
export const SubTitleRules = styled.h2`
    font-size: 30px;
    font-family: 'Manrope', sans-serif;
`;
export const FlexWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;