import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, changeOffset, clearBooks, changeBookId, clearOffset } from './booksListSlice';
import {Link} from 'react-router-dom'
import './booksList.css';

import Spinner from '../spinner/Spinner';

const BooksList = () => {
    const dispatch = useDispatch()

    const {booksLoadingStatus, books, title, sorting, offset, category, newBooks} = useSelector(state => state.books)

    const filteredCategoryBooks = (arr) => {
            if (books.length > 0 && category !== 'all') {
                return arr.filter((item) => {
                    return item.category === category
                })}

            else {return arr}
    }

    const filteredBooks = filteredCategoryBooks(books)
    const onFetchClicked = () => {
        dispatch(fetchBooks([title, offset, sorting])); dispatch(changeOffset(30)); 
    }

    const setContent = (process, Component) => {
        switch (process) {
            case 'start':
                return null
            case 'loading':
                return <Component/> 
            case 'idle':
                return <Component/>
            case 'error':
                return <h1>Error. Something went wrong. Please try later.</h1>
            default:
                throw new Error('Unexpected process state')
        }
    }
    

   useEffect(() => {
       if (title !== '') {
        dispatch(clearOffset())
        dispatch(clearBooks())
        dispatch(fetchBooks([title, offset, sorting])); 
        dispatch(changeOffset(30)); 
       }
        // eslint-disable-next-line
   }, [title, sorting])

    function renderItems  (arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (

                <li className="books__item"
                key={i}
                >
                <Link to={`/${item.title}`}
                    onClick={() => {dispatch(changeBookId(item.id)); dispatch(clearOffset())}
                    }    
                        >
                    <img style={imgStyle} src={item.thumbnail} alt={item.title} className="books__item-img"/>
                    <div className="books__item-name">{item.title}</div>
                    <div className="books__item-price">{item.authors}</div>
                    <div className="books__item-price">{item.category}</div>
                    <div className="books__item-price">{item.error}</div>
                    
                </Link>
            </li>

            )
        });
    
        return (
            <>
                 <div className="counter">{`Number of books found: ${filteredBooks.length > 0 && filteredBooks[0].category ? filteredBooks.length : 0}`}</div>
                <ul className="books__grid">
                    {items}
                    {booksLoadingStatus === 'loading' ? <Spinner/> : null}
                </ul>
            </>
           
        )
    }

       
        return (
            <div className="books__list">
                {setContent(booksLoadingStatus, () => renderItems(filteredBooks))}
               
               <button 
                    disabled={newBooks < 30}
                    style={{'display': booksLoadingStatus === 'start' ? 'none' : 'block'}}
                    onClick={() => onFetchClicked()}>
                    <div >{booksLoadingStatus === 'loading' ? 'loading...' : 'load more' }</div>
                </button> 
            </div>
        )
    }

export default BooksList;