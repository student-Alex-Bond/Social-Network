type messageType = {
    id: number
    message: string
}

type dialogType = {
    id: number
    name: string
}

export type dialogsPageType = {
    dialogs: Array<dialogType>
    messages: Array<messageType>
    newMessageBody: string
}

export type InitialDialogsStateType = typeof initialState

export type sendMessageAC =ReturnType<typeof sendMessageCreator> // возвращает типизацию на основе ActionCreator'a если не получается то в функции ActionCreator возвращаемый обьект дожен быть константой нужно написать  'as const'
export type updateNewMessageAC =ReturnType<typeof updateNewMessageActionCreator>

export const sendMessageCreator = ()=> {
    return {
        type: 'SEND-MESSAGE'
    } as const
}

export const  updateNewMessageActionCreator = (body: string) => {
    return {type: 'UPDATE-NEW-MESSAGE-BODY', body: body} as const
}

let initialState = { // обьект для инициализации, чтобы в функции combineReducer не было undefined
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Tolubaev'},
        {id: 3, name: 'Susin'},
        {id: 4, name: 'Ruletkin'},
        {id: 5, name: 'Ment'},
    ] as Array<dialogType>,
    messages: [
        {id: 1, message: 'Hi, how are you'},
        {id: 2, message: 'i am a tolubaev'},
        {id: 3, message: 'did you'},
        {id: 4, message: 'i am not understand'},
        {id: 5, message: 'yes of cos'},
    ] as Array<messageType>,
    newMessageBody: '',
}

const dialogsReducer = (state: InitialDialogsStateType = initialState , action: sendMessageAC | updateNewMessageAC): dialogsPageType => {
    debugger
    switch(action.type){
        case 'UPDATE-NEW-MESSAGE-BODY':
            state.newMessageBody = action.body
            return state
        case 'SEND-MESSAGE':
            let body = state.newMessageBody;
            state.messages.push({id: 6, message: body})
            state.newMessageBody = '';
            return state
        default:
            return state
    }

}

export default dialogsReducer;