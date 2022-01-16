import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import {Route} from "react-router-dom";
import Music from './components/Music/Music';
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from './components/Users/UsersContainer';


function App() {

    return (
        <div className={'app-wrapper'}>
            <Header/>
            <Navigation/>
            <div className={'app-wrapper-content'}>
                <Route path='/profile' render={() => <ProfileContainer/>}/>
                <Route path='/dialogs' render={() => <DialogsContainer/>}/>

                <Route path='/users' render={() => <UsersContainer />}/>

                <Route path='/music' component={Music}/>
                <Route path='/news' component={News}/>
                <Route path='/settings' component={Settings}/>
            </div>
        </div>

    );
}

export default App;
