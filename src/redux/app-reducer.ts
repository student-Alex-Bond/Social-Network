import {Dispatch} from "redux";
import {authorization} from "./auth-reducer";

const InitialState = {
    initialized: false
}


export const appReducer = (state: InitialStateType = InitialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET-INITIALISED":
            return {...state, initialized: true}
        default:
            return state
    }
}

export const setInitializeSuccessAC = () => ({type: 'SET-INITIALISED'} as const)

export const initializeApp = () => (dispatch: Dispatch<any>) => {

    let promise = dispatch(authorization())
    Promise.all([promise]).then(()=> dispatch(setInitializeSuccessAC()))
}

type InitialStateType = { initialized: boolean }
type ActionType = ReturnType<typeof setInitializeSuccessAC>