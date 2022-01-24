import React from 'react';
import styles from './Users.module.css'
import axios from "axios";
import ava_user from '../../img/ava_person.svg.png'
import {usersPropsType} from "./UsersContainer";

class Users extends React.Component<usersPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)

        })// когда используешь бэктики  строку нельзя переносить на новую строку ствать пробелы все нажатия клавиш воспринимаются буквально
    }

    onPageChanged = (currentPage: number) => {
       // debugger
        this.props.setCurrentPage(currentPage)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
        })
    }

    render() {

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)

        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        let pagination = pages.map(page => {
            return <span className={this.props.currentPage === page ? styles.selectedPage : ''}
                         onClick={(event) => {
                             this.onPageChanged(page)
                         }}>{page}</span>
        })

        return <div>
            <div>
                {pagination}

            </div>
            {
                this.props.users.map(user => <div key={user.id}>
                <span>
                    <div>
                        <img src={user.photos.small != null ? user.photos.small : ava_user} className={styles.userPhoto}
                             alt={'ava user'}/>
                    </div>
                    <div>
                        {user.followed
                            ? <button onClick={() => {
                                this.props.unfollow(user.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                this.props.follow(user.id)
                            }}>Follow</button>}

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
    }
}

export default Users;