import {actionType, dialogsPageType} from "./store";

const UPDATE_NEW_MESSAGE_BODY: string = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE: string = 'SEND-MESSAGE'



export const sendMessageCreator = () => {
    return {
        type: SEND_MESSAGE
    }
}
let initialState = {
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
}
export const  updateNewMessageActionCreator = (body: string) => {
    return {type: UPDATE_NEW_MESSAGE_BODY, body: body}
}


const dialogsReducer = (state: dialogsPageType = initialState, action: actionType) => {
    switch(action.type){
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body
            return state
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.messages.push({id: 6, message: body})
            state.newMessageBody = '';
            return state
        default:
            return state
    }

}

export default dialogsReducer;