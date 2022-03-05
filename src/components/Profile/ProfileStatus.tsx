import React, {ChangeEvent} from 'react';

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<ProfileStatusType> {


    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        return this.setState({
            editMode: true,

        })
    }
    deActivateEditMode = () => {

        this.props.updateStatus(this.state.status)
        return this.setState({
            editMode: false,
        })

    }

    handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
        return this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: ProfileStatusType, prevState: StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (<div>
            {!this.state.editMode
                ? <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || 'no status'}</span>
                </div>
                : <div>
                    <input autoFocus={true} value={this.state.status} onBlur={this.deActivateEditMode}
                           onChange={this.handleOnchange}/>
                </div>
            }
        </div>)

    };
}

export default ProfileStatus;