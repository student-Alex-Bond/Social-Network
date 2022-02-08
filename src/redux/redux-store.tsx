import {combineReducers, createStore } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";

let rootReducer =  combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
});

let store = createStore(rootReducer);

export type AppStateType = ReturnType<typeof rootReducer> // функция  ReturnType типизирует фунцию

export default store;

//@ts-ignore
window.store = store