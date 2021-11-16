import React, { ChangeEvent } from 'react';
import style from './../Dialogs/Dialogs.module.css';
import DialogItem from "./Dialog/DialogItem";
import Message from "./Message/Message";
import {messageType, dialogType} from "../../redux/store";
import { updateNewMessageActionCreator, sendMessageCreator} from '../../redux/dialogs-reducer'
type dialogsPropsType = {
    dialogs: Array<dialogType>
    messages: Array<messageType>
    newMessageBody: string
    dispatch: (action: any) => void,
}



function Dialogs(props: dialogsPropsType){

    let dialogElements = props.dialogs.map((el) => (
        <DialogItem name = {el.name} id={el.id}/>
    ))

    let messagesElements = props.messages.map((el) => (
        <Message message={el.message}/>
    ))
    let newMessageBody = props.newMessageBody

    let onSendMessageClick = () => {
        props.dispatch(sendMessageCreator())
    }

   let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value
         props.dispatch(updateNewMessageActionCreator(body))
    }
    return(
    <div className={style.dialogs}>
        <div className={style.dialogsItems}>
            {dialogElements}
        </div>
        <div className={style.messages}>
           <div>{messagesElements}</div>
            <div>
                <div><textarea value = {newMessageBody}
                               onChange={onNewMessageChange}>Enter your message</textarea></div>
                <div><button onClick={onSendMessageClick}>Send</button></div>
            </div>
        </div>
    </div>
    );
}

export default Dialogs;