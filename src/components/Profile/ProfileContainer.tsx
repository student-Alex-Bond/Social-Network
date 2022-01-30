import React from "react";
import {postType, profileType, setUserProfileAC} from "../../redux/profile-reducer";
import Profile from "./Profile";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import axios from "axios";
import {Dispatch} from "redux";
import {withRouter, RouteComponentProps} from "react-router-dom";

class ProfileAPIContainer extends React.Component<ProfilePropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId){
            userId = "2"
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId).then(response => {
            this.props.setUserProfile(response.data)

        })
    }

    render() {
        return <Profile {...this.props}/>;
    }
}


export type mapStatePropsType = {
    posts: Array<postType>
    profile: null | profileType
}

export type mapDispatchPropsType = {
    setUserProfile: (profile: profileType) => void
}

type userIdType ={
    userId: string
}

export type ProfilePropsType = mapStatePropsType & mapDispatchPropsType & RouteComponentProps<userIdType>

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        setUserProfile: (profile: profileType) => {
            dispatch(setUserProfileAC(profile))
        }
    }
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        profile: state.profilePage.profile
    }
}
// при использовании функции withRouter есть собственные параметры типизации RouteComponentProps
let withUrlDataContainerComponent = withRouter(ProfileAPIContainer)

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(withUrlDataContainerComponent)


export default ProfileContainer;

