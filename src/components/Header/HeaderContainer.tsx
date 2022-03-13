
import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {authorization, logOut} from "../../redux/auth-reducer";


class HeaderContainer extends React.Component<HeaderContainerType> {


    componentDidMount() {
        this.props.authorization()
    }

    render() {
        return <Header logOut={this.props.logOut} login={this.props.login} isAuth={this.props.isAuth}/>
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
    authorization: () => void
    logOut: () => void
}


type HeaderContainerType = mapDispatchToPropsType & mapStateToPropsType


export default connect(mapStateToProps, {authorization, logOut})(HeaderContainer);