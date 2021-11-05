import React, {RefObject, useRef} from "react";
import style from './../NewPost/NewPost.module.css'




function NewPost() {
    let newPosts = useRef<any>();
    let addPost = () => {
        if(newPosts.current){
        let text = newPosts.current.value
        alert(text)}
        newPosts.current.value = ''
    }


    return (
        <div className={style.posts}>
            <textarea ref={newPosts}>You new post</textarea> {/*поле у textarea всегда должно быть заполнено*/}
            <button onClick={addPost}>Send</button>
        </div>
    );
}

export default NewPost;