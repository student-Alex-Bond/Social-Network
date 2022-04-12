import React from 'react';
import {NavLink} from "react-router-dom";
import ava_user from "../../assets/img/ava_person.svg.png";
import styles from "./Users.module.css";
import {usersType} from "../../redux/users-reducer";

type UserPropsType = {
    users: Array<usersType>
    followingInProgress: Array<number>
    unfollow: (id: number) => void
    follow: (id: number) => void
}

const User = (props: UserPropsType) => {
    return (
        <>
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
        </>
    );
};

export  {User};