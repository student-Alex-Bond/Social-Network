import {updateNewMessageActionCreator, sendMessageCreator, dialogsPageType} from '../../redux/dialogs-reducer'
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";

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
    isAuth: boolean
}

type MapDispatchPropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
}

export type DialogsType = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        sendMessage: () => {
            dispatch(sendMessageCreator())
        },
        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageActionCreator(body))
        }
    }
}
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;