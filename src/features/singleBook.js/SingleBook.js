import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './singleBook.css'

const SingleBook = () => {

    const {books, bookId} = useSelector(state => state.books)
    const data = books.filter(item => {
        return item.id === bookId
    })

    const {title, description, thumbnail, categories, authors } = data[0];

    return (
        <div className="single-book">
        <title>{title}</title>
        <img src={thumbnail} alt={title} className="single-book__img"/>
        <div className="single-book__info">
            <h2 className="single-book__name">{title}</h2>
            <p className="single-book__descr">{description}</p>
            <p className="single-book__descr">categories: {categories}</p>
            <p className="single-book__descr">authors: {authors}</p>
        </div>
        <Link to="/" className="single-book__back">Back to all</Link>

        </div>
    )
      
}

export default SingleBook;