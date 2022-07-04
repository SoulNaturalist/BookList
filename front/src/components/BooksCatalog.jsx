import React from 'react';
import axios from "axios";
import { styled } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';


function BooksCatalog () {
    const [Books,setBooks] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [Error,setError] = React.useState(false);
    const [Search,setSearch] = React.useState(false);
    const [searchButton,setButton] = React.useState(false);
    const blue = {
        500: '#59ff91',
        600: '#47d677',
        700: '#474646',
    };
    const CustomButtonRoot = styled('span')`
    font-family: IBM Plex Sans, sans-serif;
    font-weight: bold;
    font-size: 0.875rem;
    background-color: ${blue[500]};
    position:relative;
    display: inline-block;
    bottom:-30px;
    right:28%;
    padding:10px;
    border-radius:5px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    border: none;

    &:hover {
        background-color: ${blue[600]};
    }

    &.${buttonUnstyledClasses.active} {
        background-color: ${blue[700]};
    }

    &.${buttonUnstyledClasses.focusVisible} {
        box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
        outline: none;
    }
    `;
    function CustomButton(props) {
        return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
    }
    const SearchData = (e) => {
        if (e.target.value !== 'Название книги' && e.target.value !== '') {
            setSearch(e.target.value)
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
            <CustomButton onClick={getDataSearch}>Найти</CustomButton>
            <input type="search" className="search_books" defaultValue='Название книги' onInput={e => SearchData(e)}/>  
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