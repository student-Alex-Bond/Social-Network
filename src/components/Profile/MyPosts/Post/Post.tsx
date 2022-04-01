import style from "./../Post/Post.module.css";
import React from "react";

type PostPropsType = {
    'message': string,
    'likesCount': number
}

const  Post = React.memo((props: PostPropsType) => {

    return(
    <div className={style.posts}>
        <div className={style.item}>
            <span className={style.circle}></span>
            {props.message}
            <div><span>like </span>{props.likesCount}</div>
        </div>
    </div>);
})
export default Post;