import React from "react";
import {addPostActionCreator, updateNewPostActionCreator} from "../../../../redux/profile-reducer";
import NewPost from "./NewPost";
import {connect} from "react-redux";
import {AppStateType} from "../../../../redux/redux-store";
import {Dispatch} from "redux";


//
// type addPostPropsType = {
//     dispatch: (action: any) => void
//     newPostText: string
// }
//
//
// function NewPostContainer(props: addPostPropsType) {
//
//     let onAddPost = () => {
//             props.dispatch(addPostActionCreator())
//         }
//
//     let onPostChange = (text: string) => {
//         props.dispatch(updateNewPostActionCreator(text))
//         }
//
//
//     return (
//         <NewPost onAddPost={onAddPost} updateNewPost={onPostChange}  newPostText={props.newPostText}/>)
// }

type postType = {
    id: number
    message: string
    likesCount: number
}

export type MapStatePropsType = {
    posts: Array<postType>
    newPostText: string
}

export type DispatchToProps ={
    updateNewPost: (text: string) => void
    onAddPost: () => void
}

export type NewPostsProps = MapStatePropsType & DispatchToProps

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchToProps => {
    return {
        updateNewPost: (text: string) => {
            dispatch(updateNewPostActionCreator(text))
        },
        onAddPost: () => {
            dispatch(addPostActionCreator())
        }
    }
}

const NewPostContainer = connect(mapStateToProps, mapDispatchToProps)(NewPost)

export default NewPostContainer;


