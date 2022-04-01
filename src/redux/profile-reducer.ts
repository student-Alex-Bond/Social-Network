import {Dispatch} from "redux";
import {profileAPI, userAPI} from "../API/API";
import post from "../components/Profile/MyPosts/Post/Post";


export type postType = {
    id: number
    message: string
    likesCount: number
}
export type profileType ={
    "aboutMe"?: string
    "contacts"?: {
        "facebook": string,
        "website": null,
        "vk": string,
        "twitter": string,
        "instagram": string,
        "youtube": null,
        "github":string,
        "mainLink": null
    },
    "lookingForAJob"?: boolean
    "lookingForAJobDescription"?: string
    "fullName"?: string
    "userId"?: number
    "photos"?: {
        "small": string,
        "large": string
    }
}


export type addPostAC = ReturnType<typeof addPostActionCreator>
export  type setUserProfile = ReturnType<typeof setUserProfile>
export type setStatus = ReturnType<typeof setStatus>
export type deletePost = ReturnType<typeof deletePostAC>
export const addPostActionCreator = (newPostText: string) => {
    return {
        type: 'ADD-POST',
        newPostText
    } as const
}
export const deletePostAC = (id: number) => {return {type: 'DELETE-POST', id} as const}

export const setUserProfile = (profile: profileType) => {
    return{
        type: 'SET_USER_PROFILE',
        profile
    } as const
}
export const userProfile =(userId: string) => {
    return (dispatch: Dispatch) => {
        userAPI.getProfile(userId).then(response => {
            dispatch(setUserProfile(response.data))

        })
    }
}

export const setStatus= (status: string) => {
    return{
        type: 'SET_STATUS',
        status: status
    } as const
}

export const getStatus = (userId: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.getStatus(userId).then((response)=>{
            dispatch(setStatus(response.data))
        })
    }
}

export const updateStatus = (status: string) => {

    return (dispatch: Dispatch) => {
        profileAPI.updateStatus(status).then((response)=>{
            if (response.data.resultCode === 0){
                dispatch(setStatus(status))
            }
        })
    }
}

let initialState = { // обьект для инициализации чтобы в функции combineReducer не было undefined
    posts: [
        {id: 1, message: 'Hi, how are you', likesCount: 15},
        {id: 1, message: 'Hi, fuck you', likesCount: 0},
        {id: 1, message: 'Hi, how are you', likesCount: 0},
        {id: 2, message: 'I\'m fine', likesCount: 0}] as Array<postType>,
    newPostText: '',
    profile: null as profileType | null,
    status: ''
}
export type initialProfileStateType = typeof initialState

type ActionType =addPostAC | setUserProfile | setStatus | deletePost

const profileReducer = (state: initialProfileStateType = initialState, action: ActionType  ): initialProfileStateType => {
//debugger
    switch (action.type) {
        case 'ADD-POST':
            // let stateCopy = {...state}
            // stateCopy.posts = [...state.posts]
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesCount: 0,
            }
            // stateCopy.posts.push(newPost);
            // state.newPostText = ''
            // return stateCopy;
            return {
                ...state,
                newPostText: '',
                posts: state.posts.concat(newPost)
            }
        case 'SET_USER_PROFILE':{
            return{
                ...state,
                profile: action.profile
            }
        }
        case 'SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case "DELETE-POST": {
            return {...state, posts: state.posts.filter((item) => item.id !== action.id)}
        }

        default:
            return state
    }
}

export default profileReducer;