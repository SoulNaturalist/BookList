import React from 'react';
import styled from 'styled-components';

function Rules () {
    const WrapperRules = styled.div`
    text-align: center;
    `
    const ParagraphRules = styled.p`
    position: relative;
    margin:5px;
    font-size: 20px;
    font-family: 'Manrope', sans-serif;
    `
    const TitleRules = styled.h2`
    font-size: 35px;
    font-family: 'Manrope', sans-serif;
    `
    const SubTitleRules = styled.h2`
    font-size: 30px;
    font-family: 'Manrope', sans-serif;
    `
    const FlexWrapper = styled.div`
    position:relative;
    top:250px;
    display: flex;
    justify-content: center;
    align-items: center;
    `
    return (
        <FlexWrapper>
            <WrapperRules>
                <TitleRules>Правила BookList:</TitleRules>
                <ParagraphRules>Пример правила 1</ParagraphRules>
                <ParagraphRules>Пример правила 2</ParagraphRules>
                <ParagraphRules>Пример правила 3</ParagraphRules>
                <br/>
                <SubTitleRules>Пример подзаголовка каких-либо правил</SubTitleRules>
                <ParagraphRules>Пример правила 1</ParagraphRules>
                <ParagraphRules>Пример правила 2</ParagraphRules>
                <ParagraphRules>Пример правила 3</ParagraphRules>
            </WrapperRules>
        </FlexWrapper>
)}
export default Rules;
