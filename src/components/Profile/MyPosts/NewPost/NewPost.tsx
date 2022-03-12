import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import styles from './../NewPost/NewPost.module.css'
import {NewPostsProps} from "./NewPostContainer";
import { maxLengthCreator, requiredField} from "../../../../utills/validators/validators";
import {TextArea} from "../../../common/formsControls/FormsControls";

const maxLength10 =  maxLengthCreator(10)
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
        <div className={styles.posts}>
            <AddPostFormRedux onSubmit={onAddPost}/>
        </div>
    );
}

const AddPost = (props: InjectedFormProps<FormData>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name={'newPostText'}
                   placeholder={'new your post'}
                   component={TextArea}
                   validate={[requiredField, maxLength10]}
            />
            <button>Send</button>
        </form>
    )
}

const AddPostFormRedux = reduxForm<FormData>({
    form: 'addPost'
})(AddPost)


export default NewPost;


