import React from 'react'
import {
    ImgAvatar,
    DescriptionDiv,
    UsernameParagraph,
    DescriptionParagraphUpper
} from "../styles/UserPage.styles";

export default function AuthorCard(props) {
  return (
    <div>
        <ImgAvatar src={props.img} alt="avatar" />
        <DescriptionDiv>
            <br />
            <UsernameParagraph>{props.authorName}</UsernameParagraph>
            <DescriptionParagraphUpper>
              {props.description}
            </DescriptionParagraphUpper>
          </DescriptionDiv>
    </div>
  )
}
