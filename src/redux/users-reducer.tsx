const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'


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
export type addPost = ReturnType<typeof follow>
export type updateNewPost = ReturnType<typeof unfollow>
export type setUsers = ReturnType<typeof setUsers>
export type setCurrentPage = ReturnType<typeof setCurrentPage>
export type setTotalUsersCount = ReturnType<typeof setTotalUsersCount>
export type toggleIsFetching = ReturnType<typeof toggleIsFetching>

export const follow = (userID: number) => {
    return {
        type: FOLLOW,
        userID
    } as const
}

export const unfollow = (userID: number) => {
    return {
        type: UNFOLLOW,
        userID
    } as const
}

export const setUsers = (users: Array<usersType>) => {
    return {
        type: SET_USERS,
        users
    } as const
}

export const setCurrentPage = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    } as const
}

export const setTotalUsersCount = (totalUsersCount: number) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    } as const
}

export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    } as const //обязательно для  action creator
}

let initialState = { // обьект для инициализации чтобы в функции combineReducer не было undefined
    users: [] as Array<usersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
}

export type initialProfileStateType = typeof initialState

export type commonActionType = updateNewPost | addPost | setUsers | setCurrentPage | setTotalUsersCount | toggleIsFetching

const usersReducer = (state: initialProfileStateType = initialState, action: commonActionType): initialProfileStateType => {
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
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:

            return state
    }
}

export default usersReducer;