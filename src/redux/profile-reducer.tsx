import  { profilePageType} from "./store";

export type addPostAC = ReturnType<typeof addPostActionCreator>
export type updateNewPostAC = ReturnType<typeof updateNewPostActionCreator>

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

let initialState = { // обьект для инициализации чтобы в функции combineReducer не было undefined
    posts: [
        {id: 1, message: 'Hi, how are you', likesCount: 15},
        {id: 2, message: 'I\'m fine', likesCount: 5}],
    newPostText: '',
}


const profileReducer = (state: profilePageType = initialState, action: updateNewPostAC | addPostAC) => {
        switch (action.type) {
            case 'ADD-POST':
                let newPost = {
                    id: 3,
                    message: state.newPostText,
                    likesCount: 0,
                }
                state.posts.push(newPost);
                state.newPostText = ''
                return state;
            case  "UPDATE-POST-CHANGE":
                state.newPostText = action.newText ;
                return state
            default:
                return state
        }
}

export default profileReducer;