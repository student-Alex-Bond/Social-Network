import React from 'react';
import style from './../Dialogs/Dialogs.module.css';
import DialogItem from "./Dialog/DialogItem";
import Message from "./Message/Message";




function Dialogs(){
    let dialogsData = [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Tolubaev'},
        {id: 3, name: 'Susin'},
        {id: 4, name: 'Ruletkin'},
        {id: 5, name: 'Ment'},
        ]

    let messagesData = [
        {id: 1, message: 'Hi, how are you'},
        {id: 2, message: 'i am a tolubaev'},
        {id: 3, message: 'did you'},
        {id: 4, message: 'i am not understand'},
        {id: 5, message: 'yes of cos'},
    ]

    let dialogElements = dialogsData.map(el => (
        <DialogItem name = {el.name} id={el.id}/>
    ))
    let messagesElements = messagesData.map(el => (
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