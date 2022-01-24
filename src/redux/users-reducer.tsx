const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_COUNT'


export type usersType = {
    id: number
    photos: PhotoType
    followed: boolean
    name: string
    status: string
    location?: locationType
}


type PhotoType = {
    large: string
    small: string
}

type locationType = {
    country: string
    city: string
}
export type addPostAC = ReturnType<typeof followAC>
export type updateNewPostAC = ReturnType<typeof unfollowAC>
export type setUsersAC = ReturnType<typeof setUsersAC>
export type setCurrentPageAC = ReturnType<typeof setCurrentPageAC>
export type setTotalUsersCountAC = ReturnType<typeof setTotalUsersCountAC>

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

export const setUsersAC = (users: Array<usersType>) => {
    return {
        type: SET_USERS,
        users
    } as const
}

export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    } as const
}

export const setTotalUsersCountAC = (totalUsersCount: number) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    } as const
}

let initialState = { // обьект для инициализации чтобы в функции combineReducer не было undefined
    users: [] as Array<usersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
}

export type initialProfileStateType = typeof initialState

export type commonActionType = updateNewPostAC | addPostAC | setUsersAC | setCurrentPageAC | setTotalUsersCountAC

const usersReducer = (state: initialProfileStateType = initialState, action: commonActionType): initialProfileStateType => {
//debugger
    console.log(state)
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
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        default:

            return state
    }
}

export default usersReducer;