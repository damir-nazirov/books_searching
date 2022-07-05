import {AiOutlineSearch} from 'react-icons/ai'
import { Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import InputGroup from 'react-bootstrap/InputGroup';
import { changeTitle, clearOffset, changeSorting, changeCategory } from '../booksList/booksListSlice'

import './searchForm.css'

const SearchForm = () => {

    const [bookName, setBookName] = useState('')
    const dispatch = useDispatch()

    const onChangeTitle = () => {
        dispatch(clearOffset())
        dispatch(changeTitle(bookName));
        setBookName('')
      }

      const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            onChangeTitle()
        }
      }

      const [selectedSorting, setSelectedSorting] = useState('relevance');  


    useEffect(() => {
            dispatch(clearOffset())
            dispatch(changeSorting(selectedSorting))
    },[selectedSorting])

    return (

        <InputGroup className="mb-3">
            <div className="searh_form">
            <header>
                <div className="searh_form__header">
                    <h1>Search for book</h1>
                </div>
            </header>

            <div className="input-group mb-3">
                <Form.Control 
                    autoFocus
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    type="text" 
                    className="form-control" 
                    placeholder="search book" 
                    aria-label="Recipient's username" 
                    aria-describedby="button-addon2"/>
                <button to={`/books`} 
                    onClick={() => onChangeTitle()}
                    className="btn btn-outline-secondary search-button" 
                    type="button" 
                    id="button-addon2"><AiOutlineSearch/></button>
            </div>

            <div className="search-filters">
                <div className="categories">
                    <span>Categories</span>
                <Form.Select 
                    aria-label="categories"
                    onChange={(e) => {dispatch(changeCategory(e.target.value))}}>
                        <option value="all">all</option>
                        <option value="Art">art</option>
                        <option value="Biography">biography</option>
                        <option value="Computers">computers</option>
                        <option value="History">history</option>
                        <option value="Medical">medical</option>
                        <option value="Poetry">poetry</option>

                </Form.Select>
                </div>
                
                <div className="sorting">Sorting by</div>
                <Form.Select
                onChange={(e) => {setSelectedSorting(e.target.value)}}
                aria-label="sorting">
                    <option value="relevance">relevance </option>
                    <option value="newest">newest</option>
                </Form.Select>

            </div>

        </div>

        </InputGroup>

    )
   
}

export default SearchForm