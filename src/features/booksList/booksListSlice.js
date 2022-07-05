import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    books: '',
    title: '',
    booksLoadingStatus: 'start',
    sorting: 'relevance',
    offset: 0,
    category: 'all',
    bookId: '',
    newBooks: 0
}


const _apiBase = 'https://www.googleapis.com/books/v1/volumes?q=';

// const _apiKey = 'AIzaSyDHyzZSk0BnLt1YHTaB0z3zYYwIVOBpo-0';
const _apiKey = 'AIzaSyAsPmj8VJE8iiwhASmis_D-EEHaotnbiqc';


const _transformbooks = (books) => {
    return {
        id: books.id,
        title: books.volumeInfo.title,
        category: books.volumeInfo.categories ? books.volumeInfo.categories[0] : null,
        authors: books.volumeInfo.authors ? books.volumeInfo.authors.toString() : null,
        thumbnail: books.volumeInfo.imageLinks ? books.volumeInfo.imageLinks.thumbnail : 'https://books.google.ru/googlebooks/images/no_cover_thumb.gif',
        description: books.volumeInfo.description,
        categories : books.volumeInfo.categories ? books.volumeInfo.categories : null,
    }
}


export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async ([title, offset, sorting]) => {
        const {request} = useHttp();
        return await request(`${_apiBase}${title}+intitle:${title}&startIndex=${offset}&maxResults=30&printType=books&projection=full&orderBy=${sorting}&key=${_apiKey}`);
    }
);

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        changeOffset: (state, action) => {
            state.offset = state.offset + action.payload
            
        },
        changeTitle: (state, action) => {
            state.title = action.payload
            
        },
        clearBooks: (state) => {
            state.books = []
            
        },
        clearOffset: (state) => {
            state.offset = 0
            
        },
        changeSorting: (state, action) => {
            state.sorting = action.payload
            
        },
        changeCategory: (state, action) => {
            state.category = action.payload
            
        },
        changeBookId: (state, action) => {
            state.bookId = action.payload
            
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, state => {state.booksLoadingStatus = 'loading'})
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.booksLoadingStatus = 'idle';
                const transformBooks = action.payload.items ?  action.payload.items.map(_transformbooks) : [{error: 'No books with this title found.', thumbnail: 'https://png-4.vector.me/files/images/6/8/687283/error_heading_thumb'}]
                state.books = [...state.books, ...transformBooks];
                state.newBooks = [transformBooks.length]

            })
            .addCase(fetchBooks.rejected, state => {
                state.booksLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = booksSlice;

export default reducer;
export const {
    changeOffset,
    changeTitle,
    clearBooks,
    clearOffset,
    changeSorting,
    changeCategory,
    changeBookId
} = actions;
