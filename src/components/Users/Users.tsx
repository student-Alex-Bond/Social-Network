import React from 'react';

import styles from './Users.module.css'
import { usersPropsType } from './UsersContainer';
import ava_user from "../../img/ava_user.jpg";



const Users = (props: usersPropsType) => {
   if(props.users.length === 0)
    { props.setUsers( [
        {
            id: 1,
            photo: ava_user,
            followed: true,
            fullName: 'Dmitry',
            status: 'I am a Boss',
            location: {country: 'Belarus', city: 'Minsk'}
        },
        {
            id: 2,
            photo: ava_user,
            followed: false,
            fullName: 'Svetlana',
            status: 'I am a Boss too',
            location: {country: 'Belarus', city: 'Minsk'}
        }])}
    return (
        <div>
            {
                props.users.map(user => <div key={user.id}>
                <span>
                    <div >
                        <img src={user.photo} className={styles.userPhoto} alt={'ava user'}/>
                    </div>
                    <div>
                        {user.followed
                            ?  <button onClick={() => {props.unfollow(user.id)}}>Unfollow</button>
                            : <button onClick={()=>{props.follow(user.id)}} >Follow</button>}

                    </div>
                </span>
                <span>
                    <span>
                        <div>{user.fullName}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{user.location.country}</div><div>{user.location.city}</div>
                    </span>
                </span>
                </div>)
            }
        </div>);
};

export default Users;