import {Dispatch} from "redux";
import {auth, securityAPI} from "../API/API";
import {ThunkAction} from 'redux-thunk'
import {AppStateType} from "./redux-store";

const SET_USER_DATA = 'auth/SET-USER-DATA'
const GET_CAPTCHA_URL = 'auth/GET-CAPTCHA-URL'

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: null
}

export const getCaptchaAC = (url: string | null) => {return {type: GET_CAPTCHA_URL, payload : {url: url} } as const}

export type setUserDataType = ReturnType<typeof setAuthUserData>
export type getCaptchaACType = ReturnType<typeof getCaptchaAC>

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
        }
        else {
            if(response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some Error"
            console.log(message)
        }
    }

export const getCaptchaUrl = () => async (dispatch: Dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaAC(captchaUrl))


}

export const logOut = () => async (dispatch: Dispatch) => {
    let response = await auth.logOut()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}


type ActionType = setUserDataType | getCaptchaACType


export type InitialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null
    isAuth: boolean,
    captcha: null | string

}
const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL: {
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