import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { AssignedBook } from "../../interface";

const initialState: { assignedBooks: AssignedBook[] } = {
    assignedBooks: []
}

const assignedBookSlice = createSlice({
    name: "assignedBookSlice",
    initialState: initialState,
    reducers: {
        assignBook: (state, action: PayloadAction<AssignedBook>) => {
            state.assignedBooks.push({ ...action.payload, id: nanoid() })
        },
        deleteAssignBook: (state, action) => {
            const books = state.assignedBooks.filter(book => book.id !== action.payload)
            state.assignedBooks = [...books];
        },
        assignedBooks: (state) => {
            state.assignedBooks
        },
    }
});

export const { assignedBooks, assignBook, deleteAssignBook } = assignedBookSlice.actions
export default assignedBookSlice.reducer;
