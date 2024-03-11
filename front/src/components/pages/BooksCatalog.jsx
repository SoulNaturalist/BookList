import React from "react";
import useSWR from "swr";
import CircularProgress from "@mui/material/CircularProgress";
import {
  TitleCatalog,
  SearchButton,
  MobileSearchButton,
  SearchInput,
  MobileSearchInput,
  BookCard,
  CoverBook,
  BookParagraph,
  HoverButton,
  FlexWrapper,
  LoaderWrapper,
  FlexEndWrapper
} from "../styles/BooksCatalog.styles";
import UseTitle from "../../hooks/UseTitle.js";
import { BrowserView, MobileView } from "react-device-detect";
import Card from 'react-bootstrap/Card';
import Pagination from '@mui/material/Pagination';

function BooksCatalog() {
  const [searchText, setSearchText] = React.useState("");
  const [searchFlag, setSearchFlag] = React.useState(false);
  const [pageData, setPage] = React.useState(1);
  const handleSearch = () => {
    setSearchFlag(true);
  };
  const isNumber = (n) => !isNaN(parseFloat(n)) && !isNaN(n - 0);

  const { data: dataBooks, isLoading } = useSWR(
    "http://127.0.0.1:3030/api/book_pagination",
    async (apiURL) => {
      const res = await fetch(apiURL, { method: 'POST', credentials: "include", body:JSON.stringify({page:pageData})});
      const data = await res.json();
      return data;
    },
    { refreshInterval: 200 });

  const filteredBooks = searchFlag
  ? dataBooks.filter((book) =>
      book.book_name.toLowerCase().includes(searchText.toLowerCase()) ||
      book.book_author.toLowerCase().includes(searchText.toLowerCase())
    )
  : dataBooks;
  const PaginationComponent = () => <Pagination count={10} onClick={(e) => {
    if (e.target.getAttribute("aria-label") !== null && isNumber(e.target.getAttribute("aria-label").split(" ")[1])) {
      setPage(e.target.getAttribute("aria-label").split(" ")[1])
    } else if (e.target.getAttribute("aria-label") !== null && isNumber(e.target.getAttribute("aria-label").split(" ")[3])) {
      setPage(e.target.getAttribute("aria-label").split(" ")[3])
    }
  }}/>;

  const bookComponent = () => {
    return (
      <div>
        <FlexWrapper>
          <FlexEndWrapper>
            {filteredBooks.map((book) => (
              <a key={book.slug} href={`/book/${book.slug}`}>
                <Card border="dark" style={{ width: '18rem', margin:"30px", alignSelf: "flex-end"}}>
                  <Card.Img variant="top" src={book.cover}/>
                  <Card.Body>
                    <Card.Title style={{fontSize:"12px"}}>{book.book_name} — {book.book_author}</Card.Title>
                    <Card.Text style={{fontSize:"10px"}}>
                      {book.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </a>
            ))}
          </FlexEndWrapper>
       </FlexWrapper>
      <div style={{position:"relative", top:"220px", display: "flex", alignItems:"center", justifyContent:"center"}}>
          {PaginationComponent()}
          <br/>
      </div>
    </div>
    );
  };
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
          <SearchButton onClick={handleSearch}>Поиск</SearchButton>
        </HoverButton>
        {dataBooks ? (
          bookComponent()
        ) : (
          <LoaderWrapper>
            <CircularProgress disableShrink />
          </LoaderWrapper>
        )}
      </BrowserView>
      <MobileView>
        <MobileSearchInput
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          defaultValue={searchText}
        />
        <HoverButton>
          <MobileSearchButton onClick={handleSearch}>Поиск</MobileSearchButton>
        </HoverButton>
        {dataBooks ? (
          bookComponent()
        ) : (
          <LoaderWrapper>
            <CircularProgress disableShrink />
          </LoaderWrapper>
        )}
      </MobileView>
    </>
  );
}

export default BooksCatalog;
