import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {followAC, setUsersAC, unfollowAC, usersType} from "../../redux/users-reducer";

type mapStateToPropsType = {
    users: Array<usersType>
}
type mapDispatchToPropsType ={
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<usersType>) => void
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        users: state.usersPage.users
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
return {
    follow: (userID: number) => {
        dispatch(followAC(userID))
    },
    unfollow: (userID: number) => {
        dispatch(unfollowAC(userID))
    },
    setUsers: (users: Array<usersType>) => {
        dispatch(setUsersAC(users))
}
}
}

export type usersPropsType =  mapStateToPropsType & mapDispatchToPropsType
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer;