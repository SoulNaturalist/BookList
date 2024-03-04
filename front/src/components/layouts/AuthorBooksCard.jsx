import React from 'react'
import Card from 'react-bootstrap/Card';
import {TopFlexWrapper} from "../styles/BooksCatalog.styles";
import {FlexWrapper} from "../styles/UserPage.styles";
import CircularProgress from "@mui/material/CircularProgress";


export default function AuthorBooksCard(props) {
    const BooksComponent = () => {
        if (props.books) {
            return props.books.map((book) => (
                <TopFlexWrapper key={book.slug}>
                    <a href={`/book/${book.slug}`}>
                        <Card border="dark" style={{ width: '18rem', margin:"30px", alignSelf: "flex-end", position:"relative", left:"-25px"}}>
                            <Card.Img variant="top" src={book.cover}/>
                            <Card.Body>
                            <Card.Title style={{fontSize:"12px"}}>{book.book_name} — {book.book_author}</Card.Title>
                            <Card.Text style={{fontSize:"10px"}}>
                                {book.description}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </a>
                </TopFlexWrapper>
            ))}
        }
    
  return (
    BooksComponent() || <FlexWrapper><CircularProgress disableShrink /></FlexWrapper>
    
  )
}
