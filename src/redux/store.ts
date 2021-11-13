type messageType = {
    id: number
    message: string
}
type postType = {
    id: number
    message: string
    likesCount: number
}
type dialogType = {
    id: number
    name: string
}

type profilePageType = {
    posts: Array<postType>
    newPostText: string
}
type dialogsPageType = {
    dialogs: Array<dialogType>
    messages: Array<messageType>
    newMessageBody: string
}

type stateType = {
    profilePage: profilePageType
    dialogsPage: dialogsPageType
}

type AppStoreType = {
    _state: stateType
    getState: () => void
    _callSubscriber: (_state: stateType) => void
    _addPost: () => void
    _updatePostChange: (newText: string) => void
    subscribe: (observer: any) => void
    dispatch: (action: any) => void
}

const ADD_POST: string = 'ADD-POST'
const UPDATE_POST_CHANGE: string = 'UPDATE-POST-CHANGE'
const UPDATE_NEW_MESSAGE_BODY: string = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE: string = 'SEND-MESSAGE'

let store: AppStoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you', likesCount: 15},
                {id: 2, message: 'I\'m fine', likesCount: 5}],
            newPostText: 'YO',
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Tolubaev'},
                {id: 3, name: 'Susin'},
                {id: 4, name: 'Ruletkin'},
                {id: 5, name: 'Ment'},
            ],
            messages: [
                {id: 1, message: 'Hi, how are you'},
                {id: 2, message: 'i am a tolubaev'},
                {id: 3, message: 'did you'},
                {id: 4, message: 'i am not understand'},
                {id: 5, message: 'yes of cos'},
            ],
            newMessageBody: '',
        },
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log('Changed')
    },
    _addPost() {
        let newPost = {
            id: 3,
            message: this._state.profilePage.newPostText,
            likesCount: 0,
        }
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = ''
        this._callSubscriber(this._state);
    },
    _updatePostChange(newText: string) {
        this._state.profilePage.newPostText = newText;
        this._callSubscriber(this._state);
    },
    subscribe(observer: any) {     //observer  спросить какой тип
        this._callSubscriber = observer
    },

    dispatch(action: any) {     //action  спросить какой тип
        if (action.type === ADD_POST) {
            this._addPost()
        } else if (action.type === UPDATE_POST_CHANGE) {
            this._updatePostChange(action.newText)
        } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
            this._state.dialogsPage.newMessageBody = action.body
            this._callSubscriber(this._state);
        } else if (action.type === SEND_MESSAGE) {
            let body = this._state.dialogsPage.newMessageBody;
            this._state.dialogsPage.messages.push({id: 6, message: body})
            this._state.dialogsPage.newMessageBody = '';
            this._callSubscriber(this._state);
        }
    }

}

export default store;
