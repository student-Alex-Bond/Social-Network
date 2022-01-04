import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import Profile from "./components/Profile/Profile";
import { Route} from "react-router-dom";
import Music from './components/Music/Music';
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {stateType} from './redux/store';
import DialogsContainer from './components/Dialogs/DialogsContainer';


type AppPropsType = {
    state:  stateType,
    dispatch: (action:any) => void,

}

function App(props:AppPropsType) {

    return (
           <div className={'app-wrapper'}>
               <Header/>
               <Navigation/>
               <div className={'app-wrapper-content'}>
                  <Route path='/profile' render ={() => <Profile posts={props.state.profilePage.posts}
                                                                 dispatch ={props.dispatch}
                                                                 newPostText ={props.state.profilePage.newPostText}
                                                                 />}/>
                  <Route path='/dialogs' render ={() => <DialogsContainer
                      dialogs = {props.state.dialogsPage.dialogs}
                      messages={props.state.dialogsPage.messages}
                     dispatch={props.dispatch}
                      newMessageBody={props.state.dialogsPage.newMessageBody}/>} />
                   <Route path='/music' component ={Music}/>
                  <Route path='/news' component ={News}/>
                  <Route path='/settings' component ={Settings}/>
               </div>
           </div>

    );
}

export default App;
