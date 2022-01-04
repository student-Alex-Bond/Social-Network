import React from 'react';
import {messageType, dialogType} from "../../redux/store";
import { updateNewMessageActionCreator, sendMessageCreator} from '../../redux/dialogs-reducer'
import Dialogs from "./Dialogs";
type dialogsPropsType = {
    dialogs: Array<dialogType>
    messages: Array<messageType>
    newMessageBody: string
    dispatch: (action: any) => void,
}



function DialogsContainer(props: dialogsPropsType){

    let newMessageBody = props.newMessageBody

    let onSendMessageClick = () => {
        props.dispatch(sendMessageCreator())
    }

   let onNewMessageChange = (body: string) => {

         props.dispatch(updateNewMessageActionCreator(body))
    }
    return(
    <Dialogs  newMessageBody={newMessageBody}
              dialogs={props.dialogs}
              messages={props.messages}
              updateNewMessageBody ={onNewMessageChange}
              sendMessage={onSendMessageClick}
    />)
}

export default DialogsContainer;