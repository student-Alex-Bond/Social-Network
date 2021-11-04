import React from 'react';
import style from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";

type DialogPropsType = {
    'name': string,
    'id': number
}

const DialogItem = (props: DialogPropsType) => {
   let path = '/dialogs/'+ props.id;
    return (
        <div className={style.dialog } >
            <NavLink to={path} activeClassName={style.active}>{props.name} </NavLink>
        </div>
    );
};

export default DialogItem;