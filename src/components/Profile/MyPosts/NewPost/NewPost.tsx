import React, {RefObject, useRef} from "react";
import style from './../NewPost/NewPost.module.css'
import {NewPostsProps} from "./NewPostContainer";


// type addPostPropsType = {
//     onAddPost: () => void
//     newPostText: string
//     updateNewPost: (text: string) => void
// }


function NewPost(props: NewPostsProps) {
    let newPosts = useRef() as RefObject<HTMLTextAreaElement>;// useRef нежелательно использовать, но если надо то только так типизировать можно его


    let onAddPost = () => {
        if (newPosts) {                /*условие if обязательно для typescript при работе DOM */
            props.onAddPost()
        }
    }

    let onPostChange = () => {               /*функция круговорота каждой  буквы введенной в  textarea через state  */
        if (newPosts.current) {
            let text: string = newPosts.current.value
            props.updateNewPost(text)
        }
    }

    return (
        <div className={style.posts}>
            <textarea ref={newPosts} onChange={onPostChange}
                      value={props.newPostText}>You new post</textarea> {/*поле у textarea всегда должно быть заполнено
                                                       всегда должно быть поле value and обработчик событий onChange*/}
            <button onClick={onAddPost}>Send</button>
        </div>
    );
}



export default NewPost;


