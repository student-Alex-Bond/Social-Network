import React, {ChangeEvent, useState} from "react";
import style from './../AboutMe/AboutMe.module.css'
import ava_user from "../../../assets/img/ava_person.svg.png";
import {profileType} from "../../../redux/profile-reducer";
import { ProfileDataForm } from "../ProfileDataForm";

type AboutMePropsType = {
    profile: profileType
    isOwner: boolean
    savePhoto: (photo: any) => void
}

function AboutMe(props: AboutMePropsType) {

    const [editMode, setEditMode] = useState<boolean>(false)

    const onMainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {

        if (event.currentTarget.files) {
            props.savePhoto(event.currentTarget.files[0])
        }

    }

    return (
        <div className={style.about} >
            <img src={!props.profile.photos.large ? ava_user : props.profile.photos.large} alt={'img Avatar'}/>
            <div>
                {
                    !props.isOwner && < input type={"file"} onChange={onMainPhotoSelected}/>
                }
                {editMode
                    ? <ProfileDataForm profile={props.profile} setEditMode={setEditMode}/>
                    : <ProfileData profile={props.profile}
                                   isOwner={props.isOwner}
                                   setEditMode={setEditMode}
                    />}
            </div>

        </div>
    );
}

export default AboutMe;

type ContactPropsType = {
    contactTitle: string
    contactValue: string | null
}

type ProfileDataType = {
    profile: profileType
    isOwner: boolean
    setEditMode: (value: boolean) => void
}

const ProfileData = (props: ProfileDataType) => {
    return <div className={style.description}>
        {!props.isOwner && <button onClick={() => props.setEditMode(true)}>edit</button>}
        <div>
            <div><b>Full name</b>: {props.profile.fullName}</div>
            <div><b>Looking for a job</b>: {props.profile.lookingForAJob ? 'yes' : 'no'}</div>
            {props.profile.lookingForAJob &&
                <div><b>My professional skills</b>: {props.profile.lookingForAJobDescription}</div>}
            <div><b>About me</b>: {props.profile.aboutMe}</div>
            <div>
                <b>Contact</b>:
                {(Object.keys(props.profile.contacts) as Array<keyof typeof props.profile.contacts>).map(key => {
                    return <Contact key={key} contactTitle={key}
                                    contactValue={props.profile.contacts[key]}

                    />
                })
                }
            </div>
        </div>

    </div>
}


export const Contact = ({contactTitle, contactValue}: ContactPropsType) => {
    return <div style={{paddingLeft: '15px'}}><b>{contactTitle}</b>: {contactValue}</div>
}