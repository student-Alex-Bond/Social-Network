import {sendMessageCreator, dialogsPageType} from '../../redux/dialogs-reducer'
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import React from "react";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";

// type dialogsPropsType = {
//     dialogs: Array<dialogType>
//     messages: Array<messageType>
//     newMessageBody: string
//     dispatch: (action: any) => void,
// }


// function DialogsContainer(props: dialogsPropsType) {
//
//     let newMessageBody = props.newMessageBody
//
//     let onSendMessageClick = () => {
//         props.dispatch(sendMessageCreator())
//     }
//
//     let onNewMessageChange = (body: string) => {
//
//         props.dispatch(updateNewMessageActionCreator(body))
//     }
//     return (
//         <Dialogs newMessageBody={newMessageBody}
//                  dialogs={props.dialogs}
//                  messages={props.messages}
//                  updateNewMessageBody={onNewMessageChange}
//                  sendMessage={onSendMessageClick}
//         />)
// }

type MapStatePropsType = {
    dialogsPage: dialogsPageType
}

type MapDispatchPropsType = {

    sendMessage: (newMessageBody: string) => void
}

export type DialogsType = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(sendMessageCreator(newMessageBody))
        }
    }
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);