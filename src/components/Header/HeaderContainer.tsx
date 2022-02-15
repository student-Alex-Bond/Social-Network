import axios from 'axios';
import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {authorization} from "../../redux/auth-reducer";


class HeaderContainer extends React.Component<HeaderContainerType> {


    componentDidMount() {
        this.props.authorization()
    }

    render() {
        return <Header login={this.props.login} isAuth={this.props.isAuth}/>
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
}


type HeaderContainerType = mapDispatchToPropsType & mapStateToPropsType


export default connect(mapStateToProps, {authorization})(HeaderContainer);