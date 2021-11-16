import  {actionType, profilePageType} from "./store";

const ADD_POST: string = 'ADD-POST'
const UPDATE_POST_CHANGE: string = 'UPDATE-POST-CHANGE'
export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    }
}

export const updateNewPostActionCreator = (text: string) => {
    return {
        type: UPDATE_POST_CHANGE,
        newText: text
    }
}

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you', likesCount: 15},
        {id: 2, message: 'I\'m fine', likesCount: 5}],
    newPostText: '',
}


const profileReducer = (state: profilePageType = initialState, action: actionType) => {
        switch (action.type) {
            case ADD_POST:
                let newPost = {
                    id: 3,
                    message: state.newPostText,
                    likesCount: 0,
                }
                state.posts.push(newPost);
                state.newPostText = ''
                return state;
            case  UPDATE_POST_CHANGE:
                state.newPostText = action.newText;
                return state
            default:
                return state
        }
}

export default profileReducer;