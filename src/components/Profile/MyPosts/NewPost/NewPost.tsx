import React, {useRef} from "react";
import style from './../NewPost/NewPost.module.css'

type addPostPropsType = {
    dispatch: (type: Object) => void,
    newPostText: string,

}


function NewPost(props: addPostPropsType) {
    let newPosts = useRef<any>();


    let addPost = () => {
        if (newPosts.current) {                /*условие if обязательно для typescript при работе DOM */
            let text = newPosts.current.value
            props.dispatch({type: 'ADD-POST', text: text})
        }

    }

    let onPostChange = () => {               /*функция круговорота каждой  буквы введенной в  texearea через state  */
        if (newPosts.current) {
            let text = newPosts.current.value
            props.dispatch({type: 'UPDATE-POST-CHANGE', newText: text})
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