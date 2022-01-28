export type profilePageType = {
    posts: Array<postType>
    newPostText: string
}

export type postType = {
    id: number
    message: string
    likesCount: number
}
export type addPostAC = ReturnType<typeof addPostActionCreator>
export type updateNewPostAC = ReturnType<typeof updateNewPostActionCreator>
export  type setUserProfile = ReturnType<typeof setUserProfile>

export const addPostActionCreator = () => {
    return {
        type: 'ADD-POST'
    } as const
}

export const updateNewPostActionCreator = (text: string) => {
    return {
        type: 'UPDATE-POST-CHANGE',
        newText: text
    } as const
}

export const setUserProfile = (profile: any) => {
    return{
        type: 'SET_USER_PROFILE',
        profile
    } as const
}

let initialState = { // обьект для инициализации чтобы в функции combineReducer не было undefined
    posts: [
        {id: 1, message: 'Hi, how are you', likesCount: 15},
        {id: 2, message: 'I\'m fine', likesCount: 5}] as Array<postType>,
    newPostText: '',
    profile: null
}
export type initialProfileStateType = typeof initialState

const profileReducer = (state: initialProfileStateType = initialState, action: updateNewPostAC | addPostAC |setUserProfile): initialProfileStateType => {
//debugger
    switch (action.type) {
        case 'ADD-POST':
            // let stateCopy = {...state}
            // stateCopy.posts = [...state.posts]
            let newPost = {
                id: 3,
                message: state.newPostText,
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
        case  'UPDATE-POST-CHANGE': {
            // stateCopy.newPostText = action.newText ;

            return {
                ...state,
                newPostText: action.newText
            }
        }
        case 'SET_USER_PROFILE':{
            return{
                ...state,
                profile: action.profile
            }
        }
        default:
            return state
    }
}

export default profileReducer;