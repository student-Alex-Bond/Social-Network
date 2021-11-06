import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import state, {subscribe} from "./redux/state";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost, updatePostChange} from "./redux/state";

let rerenderEntireTree = (state: any) => {
    ReactDOM.render(<App state = {state}  addPost ={addPost}  updatePostChange={updatePostChange}/>,
        document.getElementById('root')
    );

}
rerenderEntireTree(state)

subscribe(rerenderEntireTree)



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


rerenderEntireTree(state)



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
