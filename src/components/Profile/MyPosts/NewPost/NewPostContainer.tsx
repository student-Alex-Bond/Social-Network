import React  from "react";
import {addPostActionCreator, updateNewPostActionCreator} from "../../../../redux/profile-reducer";
import NewPost from "./NewPost";



type addPostPropsType = {
    dispatch: (action: any) => void
    newPostText: string
}


function NewPostContainer(props: addPostPropsType) {

    let onAddPost = () => {
            props.dispatch(addPostActionCreator())
        }

    let onPostChange = (text: string) => {
        props.dispatch(updateNewPostActionCreator(text))
        }


    return (
        <NewPost onAddPost={onAddPost} updateNewPost={onPostChange}  newPostText={props.newPostText}/>)
}

export default NewPostContainer;


