import React from 'react';
import useSWR from 'swr';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

function BooksCatalog () {
  const [searchText, setSearchText] = React.useState("");
  const [searchFlag, setSearchFlag] = React.useState(false);
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
  top:0px;
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
  display: flex;
  justify-content: center;
  align-items: center; 
  `
  const CoverBook = styled.img`
  width:20%; 
  height:auto;
  margin:5px;
  `
  const BookParagraph = styled.p`
  color:#000;
  `
  const HoverButton = styled.div`
    &:hover ${SearchButton} {
        background-color:rgb(255, 255, 255);
      }
  `
  const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  `
  const LoaderWrapper = styled.div`
  display:flex;
  justify-content:center;
  position:relative;
  top:150px;
  `

  const handleSearch = () => {
    setSearchFlag(true);
  };

  const { data: dataBooks } = useSWR('http://127.0.0.1:3030/api/get_library_books', (apiURL) => fetch(apiURL).then(res => res.json()));

  const filteredBooks = searchFlag ? dataBooks.filter((book) => book.title.toLowerCase().includes(searchText.toLowerCase())):dataBooks;

  const bookComponent = () => {
    return <FlexWrapper>
        {filteredBooks.map((book) => (
            <a key={book.id} href={`/book/${book.slug}`}>
                <BookCard>
                    <CoverBook src={book.cover} alt={book.title} />
                    <BookParagraph>{book.title}</BookParagraph>
                    <BookParagraph>{book.author}</BookParagraph>
                    <BookParagraph>{book.year}</BookParagraph>
                    <BookParagraph>{book.genre}</BookParagraph>
                </BookCard>
            </a>
        ))}
    </FlexWrapper>
  }

  return (
    <>
      <TitleCatalog>Каталог</TitleCatalog>
      <SearchInput
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
        defaultValue={searchText}
      />
      <HoverButton>
        <SearchButton onClick={handleSearch}>
          Поиск
        </SearchButton>
      </HoverButton>
      {dataBooks ? bookComponent():<LoaderWrapper><CircularProgress disableShrink /></LoaderWrapper>}
      
    </>
    );
}

export default BooksCatalog;
