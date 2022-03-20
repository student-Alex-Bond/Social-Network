import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingInProgress,
    usersType, requestUsers
} from "../../redux/users-reducer";
import Users from './Users';
import Preloader from "../common/preloader/Preloader";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {
    getUsers,
    getPgeSize,
    getTotalUsersCount,
    getCurrentPage,
    getIsFetching,
    followingInProgress
} from "../../redux/users-selectors";


type mapStateToPropsType = {
    users: Array<usersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}
type mapDispatchToPropsType = {
    setCurrentPage: (currentPage: number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}


class UsersAPIComponent extends React.Component<usersPropsType> {

    componentDidMount() {
        // // функция getUsers обертка в файле API.ts
        // this.props.toggleIsFetching(true)
        // userAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
        //     this.props.toggleIsFetching(false)
        //     this.props.setUsers(data.items)
        //     this.props.setTotalUsersCount(data.totalCount)
        //
        // })
        // // когда используешь бэктики  строку нельзя
        // // переносить на новую строку ствать пробелы
        // // все нажатия клавиш воспринимаются буквально
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (currentPage: number) => {
        this.props.requestUsers(currentPage, this.props.pageSize)

    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
                users={this.props.users}
                currentPage={this.props.currentPage}
                pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
                onPageChanged={this.onPageChanged}
               />
        </>

    }
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPgeSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: followingInProgress(state),
    }
}

export type usersPropsType = mapStateToPropsType & mapDispatchToPropsType


export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps,
    {
        follow,
        unfollow,
        setCurrentPage,
        toggleFollowingInProgress,
        requestUsers
    })

)(UsersAPIComponent)