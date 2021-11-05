import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import Music from './components/Music/Music';
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
type AppPropsType = {
    state : {profilePage: {posts: Object[]},
        dialogsPage: {
            dialogs: Object[],
            messages: Object[]
        }}
}


function App(props:AppPropsType) {

    return (
       <BrowserRouter>
           <div className={'app-wrapper'}>
               <Header/>
               <Navigation/>
               <div className={'app-wrapper-content'}>
                  <Route path='/profile' render ={() => <Profile posts={props.state.profilePage.posts} />}/>
                  <Route path='/dialogs' render ={() => <Dialogs
                      dialogs = {props.state.dialogsPage.dialogs}
                      messages={props.state.dialogsPage.messages}/>} />
                   <Route path='/music' component ={Music}/>
                  <Route path='/news' component ={News}/>
                  <Route path='/settings' component ={Settings}/>

               </div>
           </div>
           </BrowserRouter>
    );
}

export default App;
