import React from 'react';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';


function BooksCatalog () {
    const [Books,setBooks] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [Error,setError] = React.useState(false);
    React.useEffect(() => {
        axios({method: 'get',url:'http://127.0.0.1:3030/api/get_library_books',withCredentials: true, headers: {}})
        .then(response => {
            setBooks(response.data)
            setLoading(false)
        })
        .catch(err => {setError(err)})
    }, [])
    const BooksCatalog = () => {
        return <div>
            <h1 className="title__catalog">Каталог книг</h1>
            <div className="flex-wrapper">
            {loading ? (
                <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress disableShrink /></div>
            ):(
                Books.map(book => (
                    <div key={book.id} className="book__card">
                        <a href={`/books/${book.slug}`}>
                            <img src={book.cover} alt="cover" style={{width:"200px", height:"100%"}}/>
                            <div class="container">
                                <p>{book.book_name}</p> 
                                <p>{book.book_author}</p> 
                            </div>
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