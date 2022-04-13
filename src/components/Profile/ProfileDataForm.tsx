import React from "react";
import {profileType} from "../../redux/profile-reducer";
import { Contact } from "./AboutMe/AboutMe";


type ProfileDataFormType = {
    profile: profileType
    setEditMode: (value: boolean) => void
}
export const ProfileDataForm = (props: ProfileDataFormType) => {
    return <form onBlur={() => props.setEditMode(false)}>
        <div>
            <button onClick={() => props.setEditMode(true)}>save</button>
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
    </form>
}
