

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'

export type UsersPageType = {
    users: Array<usersType>

}

export type usersType = {
    id: number
    photo: string
    followed: boolean
    fullName: string
    status: string
    location: locationType
}

type locationType = {
    country: string
    city: string
}
export type addPostAC = ReturnType<typeof followAC>
export type updateNewPostAC = ReturnType<typeof unfollowAC>
export type setUsersAC = ReturnType<typeof setUsersAC>

export const followAC = (userID: number) => {
    return {
        type: FOLLOW,
        userID
    } as const
}

export const unfollowAC = (userID: number) => {
    return {
        type: UNFOLLOW,
        userID
    } as const
}

export const setUsersAC = (users: Array<usersType> ) => {
    return {
        type: SET_USERS,
        users
    } as const
}

let initialState = { // обьект для инициализации чтобы в функции combineReducer не было undefined
    users: [
    //     {
    //         id: 1,
    //         photo: ava_user,
    //         followed: true,
    //         fullName: 'Dmitry',
    //         status: 'I am a Boss',
    //         location: {country: 'Belarus', city: 'Minsk'}
    //     },
    //     {
    //         id: 2,
    //         photo: ava_user,
    //         followed: false,
    //         fullName: 'Svetlana',
    //         status: 'I am a Boss too',
    //         location: {country: 'Belarus', city: 'Minsk'}
    //     },
    //     {
    //         id: 3,
    //         photo: ava_user,
    //         followed: true,
    //         fullName: 'Evgeniy',
    //         status: 'I am a Boss too',
    //         location: {country: 'Moscow', city: 'Russia'}
    //     },
    //     {
    //         id: 4,
    //         photo: ava_user,
    //         followed: true,
    //         fullName: 'Andrew',
    //         status: 'I am a Boss too',
    //         location: {country: 'Kiev', city: 'Ukraine'}
    //     },
    ] as Array<usersType>,

}
export type initialProfileStateType = typeof initialState

const usersReducer = (state: initialProfileStateType = initialState, action: updateNewPostAC | addPostAC | setUsersAC): UsersPageType => {
//debugger
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => { // function map возвращает новый измененый массив
                    if (user.id === action.userID) {
                        return {...user, followed: true}
                    }
                    return user
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userID) {
                        return {...user, followed: false}
                    }
                    return user
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
            } as UsersPageType
        default:
            return state
    }
}

export default usersReducer;