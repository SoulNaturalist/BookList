import React from 'react';
import useSWR from 'swr';
import CircularProgress from '@mui/material/CircularProgress';
import {TitleCatalog, SearchButton, SearchInput, BookCard, CoverBook, BookParagraph, HoverButton, FlexWrapper, LoaderWrapper} from "../styles/BooksCatalog.styles";
import UseTitle from '../../hooks/UseTitle.js';
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
      <UseTitle title="Каталог"></UseTitle>
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