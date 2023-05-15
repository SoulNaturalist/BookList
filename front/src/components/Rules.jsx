import React from 'react';
import {FlexWrapper, WrapperRules, TitleRules, ParagraphRules, SubTitleRules} from "./styles/Rules.styles.js";

function Rules () {
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
