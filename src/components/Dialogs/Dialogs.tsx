import React, {ChangeEvent} from 'react';
import style from './../Dialogs/Dialogs.module.css';
import DialogItem from "./Dialog/DialogItem";
import Message from "./Message/Message";
import {DialogsType} from "./DialogsContainer";




function Dialogs(props: DialogsType){

    let dialogElements = props.dialogsPage.dialogs.map((el) => (
        <DialogItem name = {el.name} id={el.id} key={ el.id}/>
    ))

    let messagesElements = props.dialogsPage.messages.map((el) => (
        <Message message={el.message} key={el.id}/>
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
                <div><textarea value = {props.dialogsPage.newMessageBody}
                               onChange={onNewMessageChange} placeholder={'Enter your message'}>ik</textarea></div>
                <div><button onClick={onSendMessageClick}>Send</button></div>
            </div>
        </div>
    </div>
    );
}

export default Dialogs;