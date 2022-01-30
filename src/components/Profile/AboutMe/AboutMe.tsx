import React from "react";
import avatar from "../../../img/avatar.jpg";
import style from './../AboutMe/AboutMe.module.css'

type AboutMePropsType ={
profile: any
}


function AboutMe(props: AboutMePropsType){
    return(
        <div className={style.about}>
            <img src={!props.profile.photos.large? avatar : props.profile.photos.large}  alt={'img Avatar'}/>
            <div className={style.description}>
                <div className={style.name}>{props.profile.fullName}</div>
                <div>Age: 31</div>
                <div>City: in Omskim</div>
                <div>Education: OmGTU' 13 </div>
                <div>Profession: Front-End Developer </div>
            </div>
        </div>
    );
}

export default AboutMe;