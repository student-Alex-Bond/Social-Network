import React, {RefObject, useRef} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import style from './../NewPost/NewPost.module.css'
import {NewPostsProps} from "./NewPostContainer";


// type addPostPropsType = {
//     onAddPost: () => void
//     newPostText: string
//     updateNewPost: (text: string) => void
// }

type FormData = {
    newPostText: string
}

function NewPost(props: NewPostsProps) {


    let onAddPost = (values: FormData) => {
        props.onAddPost(values.newPostText)
    }



    return (
        <div className={style.posts}>
           <AddPostFormRedux onSubmit={onAddPost}/>
        </div>
    );
}

const AddPost = (props: InjectedFormProps<FormData>) => {
    return (
        <form onSubmit ={props.handleSubmit} >
             <Field name={'newPostText'} placeholder={'new your post'} component={'textarea'}/>
            <button >Send</button>
        </form>
    )
}

const AddPostFormRedux = reduxForm<FormData>({
    form: 'addPost'
})(AddPost)


export default NewPost;


