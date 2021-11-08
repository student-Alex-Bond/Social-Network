import {strict} from "assert";

let store = {
    _state: {
        profilePage :{
            posts: [
                {id: 1, message: 'Hi, how are you', likesCount: 15},
                {id: 2, message: 'I\'m fine', likesCount: 5}],
            newPostText: 'YO',
        },
        dialogsPage : {
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
            newMessageBody : '',
        },
    },
    getState(){
        return this._state;
    },
    _callSubscriber(arg: any)  {
        console.log('Changed')
    },
    _addPost(postMessage: string) {
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
    subscribe(observer: any) {
        this._callSubscriber = observer
    },

    dispatch(action: any) {
       if(action.type === 'ADD-POST'){
           this._addPost(action.type)
       } else if (action.type === 'UPDATE-POST-CHANGE'){
           this._updatePostChange(action.newText)
       }else if(action.type === 'UPDATE-NEW-MESSAGE-BODY'){
           this._state.dialogsPage.newMessageBody = action.body
           this._callSubscriber(this._state);
       }else if(action.type === 'SEND-MESSAGE'){
           let body = this._state.dialogsPage.newMessageBody;
           this._state.dialogsPage.messages.push({id: 6, message: body})
           this._state.dialogsPage.newMessageBody = '';
           this._callSubscriber(this._state);
       }
    }

}

export default store;
