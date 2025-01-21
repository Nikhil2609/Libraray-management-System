import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../interface";

const initialState: { books: Book[] } = {
    books: []
}

const bookSlice = createSlice({
    name: "bookSlice",
    initialState: initialState,
    reducers: {
        createBook: (state, action: PayloadAction<Book>) => {
            const bookAlreadyExist = state.books.find(book => book.title.toLowerCase() === action.payload.title.toLowerCase())
            if (bookAlreadyExist) {
                throw new Error('Book already exist.');
            }
            state.books.push({ ...action.payload, id: nanoid() })
        },
        editBook: (state, action) => {
            const books = state.books.map(book => {
                if (book.id === action.payload.id) {
                    return { ...action.payload }
                }
                return book;
            });
            state.books = [...books]
        },
        deleteBook: (state, action) => {
            const books = state.books.filter(book => book.id !== action.payload)
            state.books = [...books];
        },
        books: (state) => {
            state.books
        },
    }
});

export const { books, createBook, editBook, deleteBook } = bookSlice.actions
export default bookSlice.reducer;
