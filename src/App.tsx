import React, {Suspense} from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import {Route, withRouter} from "react-router-dom";
import Music from './components/Music/Music';
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";


import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from './components/Login/LoginPage';
import {compose} from 'redux';
import {connect} from "react-redux";

import {initializeApp} from "./redux/app-reducer";
import {AppStateType} from "./redux/redux-store";
import Preloader from "./components/common/preloader/Preloader";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className={'app-wrapper'}>
                <HeaderContainer/>
                <Navigation/>
                <div className={'app-wrapper-content'}>
                    <Route path='/profile/:userId?' render={() => {
                        return <Suspense fallback={<Preloader/>}>
                            <ProfileContainer/>
                        </Suspense>
                    }}/>
                    <Route path='/dialogs' render={() => {
                        return <Suspense fallback={<Preloader/>}>
                            <DialogsContainer/>
                        </Suspense>
                    }

                    }/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/news' component={News}/>
                    <Route path='/settings' component={Settings}/>
                    <Route path='/login' component={LoginPage}/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})


type AppPropsType = mapDispatchToPropsType & mapStateToPropsType
type mapStateToPropsType = { initialized: boolean }
type mapDispatchToPropsType = {
    initializeApp: () => void
}

export default compose<React.ComponentType>(withRouter,
    connect(mapStateToProps, {initializeApp}))(App);
