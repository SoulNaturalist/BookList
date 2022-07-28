import React from 'react';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';


function BooksCatalog () {
    const [Books,setBooks] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [Error,setError] = React.useState(false);
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
    React.useEffect(() => {
        axios({method: 'get',url:'http://127.0.0.1:3030/api/get_library_books',withCredentials: true, headers: {}})
        .then(response => {
            setBooks(response.data)
            setLoading(false)
        })      
        .catch(err => {setError(err)})
    }, [])
    const getDataSearch = () => {
        axios({method: 'post',url:'http://127.0.0.1:3030/api/search_books',withCredentials: true, data: {text:Search}})
        .then(response => {
            setSearch(response.data)
            setButton(true)
        })
    }
    const BooksCatalog = () => {
        return <div>
            <h1 className="title__catalog">Каталог книг</h1>
            <div className="flex-wrapper">
            <button onClick={getDataSearch} className="search_button">Найти</button>
            <input type="search" className="search_books" defaultValue='Название книги' onChange={e => SearchData(e)}/>  
            {loading ? <div style={{display: 'flex', justifyContent: 'center', position:'relative', top:'30px'}}><CircularProgress disableShrink /></div>:
            !Boolean(searchButton) ? (
                Books.map((book, index) => (
                    <div key={index} className="book__card">
                        <a href={`/book/${book.slug}`}>
                            <img src={book.cover} alt="cover" style={{ width: '100%', height:'auto'}}/>
                            <p style={{marginLeft:'60px'}}>{book.book_name}</p> 
                            <p style={{marginLeft:'60px'}}>{book.book_author}</p> 
                        </a>
                    </div>
                ))
            ):(
                Search.map((book, index) => (
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