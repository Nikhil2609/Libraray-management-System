import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/UserSlice";
import bookReducer from "./Slice/BookSlice";
import AssignedBookReducer from "./Slice/assignedBookSlice";
import storage from "redux-persist/es/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    user: userReducer,
    book: bookReducer,
    assignBook: AssignedBookReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
});
export const persistor = persistStore(store);