import React, {ChangeEvent} from "react";
import style from './../AboutMe/AboutMe.module.css'
import ava_user from "../../../assets/img/ava_person.svg.png";

type AboutMePropsType = {
    profile: any
    isOwner: boolean
    savePhoto: (photo: any)=> void
}

function AboutMe(props: AboutMePropsType) {

    const onMainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {

        if (event.currentTarget.files) {
            props.savePhoto(event.currentTarget.files[0])
            console.log(typeof event.currentTarget.files[0])
        }

    }
    return (
        <div className={style.about}>
            <img src={!props.profile.photos.large ? ava_user : props.profile.photos.large} alt={'img Avatar'}/>
            <div>
                {
                    !props.isOwner && < input type={"file"} onChange={onMainPhotoSelected}/>
                }
            </div>
            <div className={style.description}>
                <div className={style.name}>{props.profile.fullName}</div>
                <div>Age: 31</div>
                <div>City: in Omskim</div>
                <div>Education: OmGTU' 13</div>
                <div>Profession: Front-End Developer</div>
            </div>
        </div>
    );
}

export default AboutMe;