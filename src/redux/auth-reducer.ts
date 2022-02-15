import {Dispatch} from "redux";
import {auth} from "../API/API";

const SET_USER_DATA = 'SET-USER-DATA'

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export type setUserDataType = ReturnType<typeof setAuthUserData>
export const setAuthUserData = (userId: number, email: string, login: string ) => {return {type: SET_USER_DATA, data: {userId, email, login} }}

export const authorization = () => {
    return (dispatch: Dispatch) => {
        auth.me().then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                dispatch(setAuthUserData(id, email, login))
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
               ...action.data,
                isAuth: true
            }
        }
        default:
            return state
    }
}

export default authReducer;