import React from 'react';
import ava_user from "../../img/ava_person.svg.png";
import styles from "./Users.module.css";
import {usersType} from "../../redux/users-reducer";
import {NavLink} from 'react-router-dom';
import {Paginator} from "../common/Padinator/Paginator";
import {User} from "./User";


type usersProps = {
    unfollow: (id: number) => void
    follow: (id: number) => void
    followingInProgress: Array<number>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<usersType>
    onPageChanged: (page: number) => void
}

const Users = (props: usersProps) => {

    return (
        <div>
            <div>
                <div>
                    <Paginator totalUsersCount={props.totalUsersCount}
                               pageSize={props.pageSize}
                               currentPage={props.currentPage}
                               onPageChanged={props.onPageChanged}/>
                </div>

                <User users={props.users}
                      followingInProgress={props.followingInProgress}
                      unfollow={props.unfollow}
                      follow={props.follow}
                />
            </div>
        </div>
    );
};

export default Users;