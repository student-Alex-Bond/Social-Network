import {Dispatch} from "redux";
import {auth} from "../API/API";
import {stopSubmit} from "redux-form"
import {ThunkAction} from 'redux-thunk'
import {AppStateType} from "./redux-store";

const SET_USER_DATA = 'auth/SET-USER-DATA'

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

export const authorization = () => async (dispatch: Dispatch<ActionType>) => {
   let response = await auth.me()
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
}


export const login = (email: string, password: string, rememberMe: boolean): ThunkAction<void, AppStateType, unknown, ActionType> =>
   async (dispatch) => {
    let response = await auth.login(email, password, rememberMe)
            if (response.data.resultCode === 0) {
                dispatch(authorization())
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some Error"
                console.log(message)
            }
}


export const logOut = () => async (dispatch: Dispatch) => {
       let response = await auth.logOut()
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
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