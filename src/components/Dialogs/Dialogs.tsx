import React, {ChangeEvent} from 'react';
import style from './../Dialogs/Dialogs.module.css';
import DialogItem from "./Dialog/DialogItem";
import Message from "./Message/Message";
import {DialogsType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from 'redux-form';


type FormData = {
    newMessageBody: string
}

function Dialogs(props: DialogsType) {

    let dialogElements = props.dialogsPage.dialogs.map((el) => (
        <DialogItem name={el.name} id={el.id} key={el.id}/>
    ))

    let messagesElements = props.dialogsPage.messages.map((el) => (
        <Message message={el.message} key={el.id}/>
    ))


    const addNewMessage = (values: FormData) => {
        props.sendMessage(values.newMessageBody)
    }
    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogElements}
            </div>
            <div className={style.messages}>
                <div>{messagesElements}</div>
            </div>
            <ReduxAddMessageForm onSubmit={addNewMessage}/>
        </div>
    );
}


export const AddMessageForm = (props: InjectedFormProps<FormData>) => {
    return (<form onSubmit={props.handleSubmit}>
        < div>
            <Field component={'textarea'} name={'newMessageBody'} placeholder={'Enter your message'}/>
        </div>
        < div>
            <button> Send</button>
        </div>
    </form>)
}

const ReduxAddMessageForm = reduxForm<FormData>({
    form: 'dialogAddMessageForm'
})(AddMessageForm)

export default Dialogs;