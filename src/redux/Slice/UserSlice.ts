import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../interface";

const initialState: UserState = {
    isLoggedIn: false,
    user: null,
    registeredUsers: []
}

const userSlice = createSlice({
    name: "userSlice",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            const userExist = state.registeredUsers.find(user => user.email === action.payload.email &&
                user.password === action.payload.password
            );
            if(!userExist) {
                throw new Error('Invalid email and password');
            }
            state.user = userExist ? userExist : null ;
            state.isLoggedIn = userExist ? true : false;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
        register: (state, action) => {
            if (state.registeredUsers?.length > 0) {
                const userAlreadyExist = state.registeredUsers.find(user => user.email.toLowerCase() === action.payload.email.toLowerCase())
                if (userAlreadyExist) {
                    throw new Error('Email is already exist, please registed with diffrenet email');
                }
            }
            state.user = action.payload;
            state.isLoggedIn = false;
            state.registeredUsers = [...state.registeredUsers, action.payload]
        },
    }
});

export const { login, logout, register } = userSlice.actions
export default userSlice.reducer;
