import React from "react";
import {postType, profileType, userProfile} from "../../redux/profile-reducer";
import Profile from "./Profile";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {withRouter, RouteComponentProps, Redirect} from "react-router-dom";

class ProfileAPIContainer extends React.Component<ProfilePropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
         if(!userId){
             userId = "2"
         }
        this.props.userProfile(userId)
        // let userId = this.props.match.params.userId
        // if(!userId){
        //     userId = "2"
        // }
        // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId).then(response => {
        //     this.props.setUserProfile(response.data)
        //
        // })
    }



    render() {
        if(!this.props.isAuth) {
            return <Redirect to={'/login'}/>
        }

        return <Profile {...this.props}/>;
    }
}


export type mapStatePropsType = {
    posts: Array<postType>
    profile: null | profileType
    isAuth: boolean
}

export type mapDispatchPropsType = {
    userProfile: (userId: string) => void
}

type userIdType ={
    userId: string
}

export type ProfilePropsType = mapStatePropsType & mapDispatchPropsType & RouteComponentProps<userIdType>



const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth
    }
}
// при использовании функции withRouter есть собственные параметры типизации RouteComponentProps
let withUrlDataContainerComponent = withRouter(ProfileAPIContainer)

const ProfileContainer = connect(mapStateToProps, {userProfile})(withUrlDataContainerComponent)


export default ProfileContainer;

