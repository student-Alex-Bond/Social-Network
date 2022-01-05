import {combineReducers, createStore } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

let rootReducer =  combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer
});

let store = createStore(rootReducer);

export type AppStateType = ReturnType<typeof rootReducer> // функция  ReturnType типизирует фунцию

export default store;