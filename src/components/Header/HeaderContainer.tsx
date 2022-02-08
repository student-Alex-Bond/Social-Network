import axios from 'axios';
import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setAuthUserData} from "../../redux/auth-reducer";
import {Dispatch} from "redux";


class HeaderContainer extends React.Component<HeaderContainerType> {


    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true // цепялется кука с твоей авторизацией на сервере
        }).then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                this.props.setAuthUserData(id, email, login)
            }
        })
    }

    render() {
        return <Header login={this.props.login} isAuth={this.props.isAuth} />
    }
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

type mapStateToPropsType = {
    isAuth: boolean
    login: string | null
}

type mapDispatchToPropsType = {
    setAuthUserData: (id: number, email: string, login: string) => void
}
const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        setAuthUserData: (id: number, email: string, login: string) => {
            dispatch(setAuthUserData(id, email, login))
        }
    }
}

type HeaderContainerType = mapDispatchToPropsType & mapStateToPropsType


export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);