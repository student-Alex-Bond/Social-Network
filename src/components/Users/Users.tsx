import React from 'react';
import ava_user from "../../img/ava_person.svg.png";
import styles from "./Users.module.css";
import {usersType} from "../../redux/users-reducer";
import {NavLink} from 'react-router-dom';


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

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let pagination = pages.map(page => {
        return <span className={props.currentPage === page ? styles.selectedPage : ''}
                     onClick={() => {
                         props.onPageChanged(page)
                     }}>{page}</span>
    })


    return (
        <div>
            <div>
                <div>
                    {pagination}
                </div>
                {
                    props.users.map(user => <div key={user.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : ava_user} className={styles.userPhoto}
                             alt={'ava user'}/>
                            </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={props.followingInProgress.some(id=> id === user.id)}
                                      onClick={() => {props.unfollow(user.id)}}>Unfollow</button>

                            : <button disabled={props.followingInProgress.some(id=> id === user.id)}
                                      onClick={() => {props.follow(user.id)}}>Follow</button>}

                    </div>
                </span>
                        <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{"user.location.country"}</div><div>{"user.location.city"}</div>
                    </span>
                </span>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Users;