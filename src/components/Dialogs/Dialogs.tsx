import React from 'react';
import style from './../Dialogs/Dialogs.module.css';
import DialogItem from "./Dialog/DialogItem";
import Message from "./Message/Message";

type DialogsPropsType = {
    dialogs: Object[],
    messages : Object[],
    newMessageBody: string,
    dispatch: (type: Object) => void,
}


function Dialogs(props: DialogsPropsType){

    let dialogElements = props.dialogs.map((el:any) => (
        <DialogItem name = {el.name} id={el.id}/>
    ))

    let messagesElements = props.messages.map((el: any) => (
        <Message message={el.message}/>
    ))
    let newMessageBody = props.newMessageBody

    let onSendMessageClick = () => {

        props.dispatch({type: 'SEND-MESSAGE'})
    }

    let onNewMessageChange = (e: any) => {  // спросить тип event
        let body = e.target.value
         props.dispatch({type: 'UPDATE-NEW-MESSAGE-BODY', body: body})
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