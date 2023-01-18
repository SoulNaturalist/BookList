import React from 'react';
import useSWR from 'swr';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';


function BooksCatalog () {
    const [Search,setSearch] = React.useState(false);
    const [searchButton,setButton] = React.useState(false);
    const SearchData = (e) => {
        if (e.target.value !== 'Название книги' && e.target.value !== '') {
            setSearch(e.target.value)
            setButton(false)
        } else if (e.target.value !== 'Название книги' && e.target.value === '') {
            setButton(false)
        }
    }
    const { dataBooks } = useSWR('http://127.0.0.1:3030/api/get_library_books', (apiURL) => fetch(apiURL,{
        method: "get",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => res.json()));
    const { dataSearch } = useSWR('http://127.0.0.1:3030/api/search_books', (apiURL) => fetch(apiURL,{
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({text:Search})
    }).then(res => res.json()));
    const TitleCatalog = styled.h1`
    text-align: center;
    margin-top:130px;
    font-family: 'Manrope', sans-serif;
    `
    const SearchButton = styled.button`
    all: unset;
    cursor: pointer;
    background-color:rgb(101, 245, 166);
    width:5%;
    height:40px;
    text-align:center;
    color:rgb(0, 0, 0);
    position: relative;
    top:85px;
    left:71%;
    font-family: 'Manrope';
    box-shadow: "0px 5px 5px -5px rgba(34, 60, 80, 0.6)";
    -webkit-box-shadow: 0px 5px 10px 2px rgba(143, 255, 146, 0.2);
    -moz-box-shadow: 0px 5px 10px 2px rgba(143, 255, 146, 0.2);
    box-shadow: 0px 5px 10px 2px rgba(143, 255, 146, 0.2);
    `
    const SearchInput = styled.input`
    display: block;
    position: relative;
    top:40px;
    margin-right: auto;
    margin-left: auto;
    color:#000;
    width:40%;
    border:2px solid #000;
    padding: 10px 10px; 
    line-height: 10px;
    `
    const BookCard = styled.div`
    position: relative;
    top:60px;
    justify-items: center;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows:400px;
    padding:15px;
    flex-basis:50%;
    `
    const CoverBook = styled.img`
    width:100%; 
    height:auto;
    `
    const BookParagraph = styled.p`
    margin-left:60px;
    `
    const HoverButton = styled.div`
    &:hover ${SearchButton} {
        background-color:rgb(255, 255, 255);
      }
    `
    const FlexWrapper = styled.div`
    display: flex;
    justify-content:center;
    position:relative;
    top: 90px;
    `

    const BooksCatalog = () => {
        return <div>
            <TitleCatalog>Каталог книг</TitleCatalog>
            <HoverButton>
                <SearchButton onClick={dataSearch}>Найти</SearchButton>
            </HoverButton>
            <SearchInput type="search" defaultValue='Название книги' onChange={e => SearchData(e)}/>  
            {!dataBooks ? <FlexWrapper><CircularProgress disableShrink /></FlexWrapper>:
            Boolean(searchButton) ? (
                dataBooks.map((book, index) => (
                    <BookCard key={index}>
                        <a href={`/book/${book.slug}`}>
                            <CoverBook src={book.cover} alt="cover"/>
                            <BookParagraph>{book.book_name}</BookParagraph> 
                            <BookParagraph>{book.book_author}</BookParagraph> 
                        </a>
                    </BookCard>
                ))
            ):(
                dataSearch.map((book, index) => (
                    <BookCard key={index}>
                        <a href={`/book/${book.slug}`}>
                            <CoverBook src={book.cover} alt="cover"/>
                            <BookParagraph>{book.book_name}</BookParagraph> 
                            <BookParagraph>{book.book_author}</BookParagraph> 
                        </a>
                    </BookCard>
                ))
            )}
            </div>
    }

    return (
        <div>{BooksCatalog()}</div>
    );
}

export default BooksCatalog;