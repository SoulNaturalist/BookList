import React from 'react';
import useSWR from 'swr';
import CircularProgress from '@mui/material/CircularProgress';
import {TitleCatalog, SearchButton,MobileSearchButton, SearchInput, MobileSearchInput, BookCard, CoverBook, BookParagraph, HoverButton, FlexWrapper, LoaderWrapper} from "../styles/BooksCatalog.styles";
import UseTitle from '../../hooks/UseTitle.js';
import { BrowserView, MobileView} from 'react-device-detect';

function BooksCatalog () {
  const [searchText, setSearchText] = React.useState("");
  const [searchFlag, setSearchFlag] = React.useState(false);
  const handleSearch = () => {
    setSearchFlag(true);
  };

  const { data: dataBooks} = useSWR('http://127.0.0.1:3030/api/get_library_books', (apiURL) => fetch(apiURL).then(res => res.json()));

  const filteredBooks = searchFlag ? dataBooks.filter((book) => book.title.toLowerCase().includes(searchText.toLowerCase())):dataBooks;

  const bookComponent = () => {
    return <FlexWrapper>
        {filteredBooks.map((book) => (
            <a key={book.slug} href={`/book/${book.slug}`}>
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
      <UseTitle title="Каталог"></UseTitle>
      <TitleCatalog>Каталог</TitleCatalog>
      <BrowserView>
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
      </BrowserView>
      <MobileView>
        <MobileSearchInput
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          defaultValue={searchText}
        />
        <HoverButton>
            <MobileSearchButton onClick={handleSearch}>
              Поиск
            </MobileSearchButton>
        </HoverButton>
        {dataBooks ? bookComponent():<LoaderWrapper><CircularProgress disableShrink /></LoaderWrapper>}
      </MobileView>
    </>
    );
}

export default BooksCatalog;