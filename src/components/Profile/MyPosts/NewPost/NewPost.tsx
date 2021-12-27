import React, {useRef} from "react";
import style from './../NewPost/NewPost.module.css'
import {addPostActionCreator, updateNewPostActionCreator} from "../../../../redux/profile-reducer";



type addPostPropsType = {
    dispatch: (action: any) => void,
    newPostText: string,
}


function NewPost(props: addPostPropsType) {
    let newPosts = useRef<any>();


    let addPost = () => {
        if (newPosts.current) {                /*условие if обязательно для typescript при работе DOM */
            props.dispatch(addPostActionCreator())
        }
    }

    let onPostChange = () => {               /*функция круговорота каждой  буквы введенной в  textarea через state  */
        if (newPosts.current) {
            let text: string = newPosts.current.value
            props.dispatch(updateNewPostActionCreator(text))
        }
    }

    return (
        <div className={style.posts}>
            <textarea ref={newPosts} onChange={onPostChange}
                      value={props.newPostText}>You new post</textarea> {/*поле у textarea всегда должно быть заполнено
                                                       всегда должно быть поле value and обработчик событий onChange*/}
            <button onClick={addPost}>Send</button>
        </div>
    );
}

export default NewPost;