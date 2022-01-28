import React from "react";
import {postType, setUserProfile} from "../../redux/profile-reducer";
import Profile from "./Profile";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import axios from "axios";
import {Dispatch} from "redux";


export type ProfilePropsType = mapStatePropsType & mapDispatchPropsType

class ProfileAPIContainer extends React.Component<ProfilePropsType> {


    componentDidMount() {

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(response => {
            this.props.setUserProfile(response.data)

        })
    }

    render() {
        return <Profile {...this.props}/>;
    }
}


export type mapStatePropsType = {
    posts: Array<postType>
    profile: null | any
}

export type mapDispatchPropsType = {
    setUserProfile: (profile: any) => void
}


const mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        setUserProfile: (profile: any) => {
            dispatch(setUserProfile(profile))
        }
    }
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        profile: state.profilePage.profile
    }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileAPIContainer)


export default ProfileContainer;

