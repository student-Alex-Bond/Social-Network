import React from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from './components/Login/LoginPage';
import {compose} from 'redux';
import {connect} from "react-redux";

import {initializeApp} from "./redux/app-reducer";
import {AppStateType} from "./redux/redux-store";
import Preloader from "./components/common/preloader/Preloader";


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
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' component={LoginPage}/>
                        <Route path='*' component={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
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
