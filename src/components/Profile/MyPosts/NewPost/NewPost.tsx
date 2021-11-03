import React from "react";
import style from './../NewPost/NewPost.module.css'

function NewPost(){
    return(
        <div className={style.posts}>
            <textarea></textarea>
            <button>Send</button>
        </div>
    );
}
export default NewPost;