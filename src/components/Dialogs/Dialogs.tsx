import React from 'react';
import style from './../Dialogs/Dialogs.module.css';
import DialogItem from "./Dialog/DialogItem";
import Message from "./Message/Message";

type DialogsPropsType = {
    dialogs: Object[],
    messages : Object[]
}


function Dialogs(props: DialogsPropsType){

    let dialogElements = props.dialogs.map((el:any) => (
        <DialogItem name = {el.name} id={el.id}/>
    ))

    let messagesElements = props.messages.map((el: any) => (
        <Message message={el.message}/>
    ))


    return(
    <div className={style.dialogs}>
        <div className={style.dialogsItems}>
            {dialogElements}
        </div>
        <div className={style.messages}>
            {messagesElements}
        </div>
    </div>
    );
}

export default Dialogs;