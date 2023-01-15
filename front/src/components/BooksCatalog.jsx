import React from 'react';
import useSWR from 'swr';
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
    const BooksCatalog = () => {
        return <div>
            <h1 className="title__catalog">Каталог книг</h1>
            <div className="flex-wrapper">
            <button onClick={dataSearch} className="search_button">Найти</button>
            <input type="search" className="search_books" defaultValue='Название книги' onChange={e => SearchData(e)}/>  
            {!dataBooks ? <div style={{display: 'flex', justifyContent: 'center', position:'relative', top:'90px'}}><CircularProgress disableShrink /></div>:
            Boolean(searchButton) ? (
                dataBooks.map((book, index) => (
                    <div key={index} className="book__card">
                        <a href={`/book/${book.slug}`}>
                            <img src={book.cover} alt="cover" style={{ width: '100%', height:'auto'}}/>
                            <p style={{marginLeft:'60px'}}>{book.book_name}</p> 
                            <p style={{marginLeft:'60px'}}>{book.book_author}</p> 
                        </a>
                    </div>
                ))
            ):(
                dataSearch.map((book, index) => (
                    <div key={index} className="book__card">
                        <a href={`/book/${book.slug}`}>
                            <img src={book.cover} alt="cover" style={{ width: '100%', height:'auto'}}/>
                            <p style={{marginLeft:'60px'}}>{book.book_name}</p> 
                            <p style={{marginLeft:'60px'}}>{book.book_author}</p> 
                        </a>
                    </div>
                ))
            )}
            </div>
        </div>
    }

    return (
        <div>{BooksCatalog()}</div>
    );
}

export default BooksCatalog;