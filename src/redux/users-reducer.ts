import {userAPI} from "../API/API";
import {Dispatch} from "redux";
import {AppStateType} from "./redux-store";


const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS'


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

export type addPost = ReturnType<typeof followSuccess>
export type updateNewPost = ReturnType<typeof unfollowSuccess>
export type setUsers = ReturnType<typeof setUsers>
export type setCurrentPage = ReturnType<typeof setCurrentPage>
export type setTotalUsersCount = ReturnType<typeof setTotalUsersCount>
export type toggleIsFetching = ReturnType<typeof toggleIsFetching>
export type toggleFollowingInProgress = ReturnType<typeof toggleFollowingInProgress>


export const followSuccess = (userID: number) => {
    return {
        type: FOLLOW,
        userID
    } as const
}
export const unfollowSuccess = (userID: number) => {
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
export const toggleFollowingInProgress = (isFetching: boolean, userId: number) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    } as const
}

type getStateType = () => AppStateType

export const requestUsers = (currentPage: number, pageSize: number) => {
    return async (dispatch: Dispatch, getSate: getStateType) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))

        let data = await userAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))

    }
}
export const follow = (userId: number) => async (dispatch: Dispatch) => {

   await followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), followSuccess)
}
export const unfollow = (userId: number) => async (dispatch: Dispatch) => {
    
    await followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), unfollowSuccess)
}

let initialState = { // обьект для инициализации чтобы в функции combineReducer не было undefined
    users: [] as Array<usersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
}
export type initialProfileStateType = typeof initialState

export type ActionType =
    updateNewPost
    | addPost
    | setUsers
    | setCurrentPage
    | setTotalUsersCount
    | toggleIsFetching
    | toggleFollowingInProgress


const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: Function, actionCreator: Function) => {
    dispatch(toggleFollowingInProgress(true, userId))
    let response = await apiMethod(userId)

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingInProgress(false, userId))
}

const usersReducer = (state: initialProfileStateType = initialState, action: ActionType): initialProfileStateType => {
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
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:

            return state
    }
}

export default usersReducer;