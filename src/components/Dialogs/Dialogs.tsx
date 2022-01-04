import React, {ChangeEvent} from 'react';
import style from './../Dialogs/Dialogs.module.css';
import DialogItem from "./Dialog/DialogItem";
import Message from "./Message/Message";
import {messageType, dialogType} from "../../redux/store";
type dialogsPropsType = {
    dialogs: Array<dialogType>
    messages: Array<messageType>
    newMessageBody: string
    updateNewMessageBody: (body: string) => void
    sendMessage: ()=> void

}



function Dialogs(props: dialogsPropsType){

    let dialogElements = props.dialogs.map((el) => (
        <DialogItem name = {el.name} id={el.id}/>
    ))

    let messagesElements = props.messages.map((el) => (
        <Message message={el.message}/>
    ))

    let onNewMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let body = event.currentTarget.value
        props.updateNewMessageBody(body)
    }

    let onSendMessageClick = () => {
        props.sendMessage()
    }

    return(
    <div className={style.dialogs}>
        <div className={style.dialogsItems}>
            {dialogElements}
        </div>
        <div className={style.messages}>
           <div>{messagesElements}</div>
            <div>
                <div><textarea value = {props.newMessageBody}
                               onChange={onNewMessageChange}>Enter your message</textarea></div>
                <div><button onClick={onSendMessageClick}>Send</button></div>
            </div>
        </div>
    </div>
    );
}

export default Dialogs;