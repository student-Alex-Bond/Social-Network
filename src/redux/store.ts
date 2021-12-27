import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

export type messageType = {
    id: number
    message: string
}
export type postType = {
    id: number
    message: string
    likesCount: number
}
export type dialogType = {
    id: number
    name: string
}

export type profilePageType = {
    posts: Array<postType>
    newPostText: string
}
export type dialogsPageType = {
    dialogs: Array<dialogType>
    messages: Array<messageType>
    newMessageBody: string
}

 export type stateType = {
    profilePage: profilePageType
    dialogsPage: dialogsPageType
}

export type AppStoreType = {
    _state: stateType
    getState: () => stateType
    _callSubscriber: (_state: stateType) => void
    subscribe: (observer: any) => void
    dispatch: (action: any) => void
}

export interface actionType {
    type: string,
    newText: string
    body: string
    text: string
}

let store: AppStoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you', likesCount: 15},
                {id: 2, message: 'I\'m fine', likesCount: 5}],
            newPostText: '',
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

    subscribe(observer: () => void) {     // type function
        this._callSubscriber = observer
    },

    dispatch(action: any) {
        this._state.profilePage = profileReducer( this._state.profilePage, action) // this._state.profilePage => это часть store необходимая для выполнения функции
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action) // тоже самое  смотри на строчку выше
        this._callSubscriber(this._state);
    }
}

export default store;
