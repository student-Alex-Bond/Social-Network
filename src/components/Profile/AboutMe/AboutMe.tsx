import React from "react";
import avatar from "../../../img/avatar.jpg";
import style from './../AboutMe/AboutMe.module.css'


function AboutMe(){
    return(
        <div className={style.about}>
            <img src={avatar}  alt={'img Avatar'}/>
            <div className={style.description}>
                <div className={style.name}>Alex Bond</div>
                <div>Age: 31</div>
                <div>City: in Omskim</div>
                <div>Education: OmGTU' 13 </div>
                <div>Profession: Front-End Developer </div>
            </div>
        </div>
    );
}

export default AboutMe;