import React from "react";
import {connect, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import Profile from "./Profile";
import {Dispatch} from "redux";
import {postType} from "../../redux/profile-reducer";


export type mapStatePropsType = {
    posts: Array<postType>
}

export type mapDispatchPropsType = {}

export type ProfilePropsType = mapStatePropsType & mapDispatchPropsType

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType =>{
    return {}
}

const mapStateToProps = (state: AppStateType):mapStatePropsType => {
    return {
        posts: state.profilePage.posts
    }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile)
export default ProfileContainer;