import React from "react";
import {getStatus, postType, profileType, savePhoto, updateStatus, userProfile} from "../../redux/profile-reducer";
import Profile from "./Profile";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {compose} from "redux";


class ProfileAPIContainer extends React.Component<ProfilePropsType> {

    refreshProfile() {
        let userId = this.props.match.params.userId

        if (!userId) {
            userId = String(this.props.authorizedUserId)
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.userProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfilePropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }


    render() {
        return <Profile {...this.props} status={this.props.status} updateStatus={this.props.updateStatus}/>;
    }
}


export type mapStatePropsType = {
    posts: Array<postType>
    profile:  profileType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean

}

export type mapDispatchPropsType = {
    userProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
    savePhoto: (photo: any) => void
}

type userIdType = {
    userId: string
}

export type ProfilePropsType = mapStatePropsType & mapDispatchPropsType & RouteComponentProps<userIdType>


const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,

    }
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, {userProfile, updateStatus, getStatus, savePhoto}),
    withRouter
)
(ProfileAPIContainer)

//
// let AuthRedirectComponent = withAuthRedirect(ProfileAPIContainer)
// // при использовании функции withRouter есть собственные параметры типизации RouteComponentProps
// let withUrlDataContainerComponent = withRouter(AuthRedirectComponent)
//
// const ProfileContainer = connect(mapStateToProps, {userProfile})(withUrlDataContainerComponent)
//
//
//  ProfileContainer;

