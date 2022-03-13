import {Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {auth} from "../API/API";
import {AppDispatch} from "./redux-store";
import {stopSubmit} from "redux-form"

const SET_USER_DATA = 'SET-USER-DATA'

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export type setUserDataType = ReturnType<typeof setAuthUserData>
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {type: SET_USER_DATA, payload: {userId, email, login, isAuth}}
}

export const authorization = () => (dispatch: AppDispatch) => {
    auth.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login, isAuth} = response.data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
}


export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: ThunkDispatch<any, any,
    any>) => {
    auth.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(authorization())
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some Error"
                console.log(message)
                let action = stopSubmit('login', {_error: message});
                dispatch(action);
            }
        })
}


export const logOut = () => {
    return (dispatch: Dispatch) => {
        auth.logOut().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
    }
}

type ActionType = setUserDataType


export type InitialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null
    isAuth: boolean
}
const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}

export default authReducer;