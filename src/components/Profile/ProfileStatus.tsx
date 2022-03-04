import React, {ChangeEvent} from 'react';

type ProfileStatusType = {
    status: string
}


class ProfileStatus extends React.Component<ProfileStatusType> {

    state ={
        editMode: false,
        value: this.props.status
    }

    activateEditMode = () => {
      return this.setState({
           editMode: true,

       })
    }
    deActivateEditMode = () => {
        return this.setState({
            editMode: false
        })
    }

    handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
       return this.setState({
            value: e.currentTarget.value
        })
    }
    render() {
        return (  <div>
            { !this.state.editMode
                ? <div>
                    <span onDoubleClick={this.activateEditMode}>{this.state.value}</span>
                </div>
                :<div>
                <input autoFocus={true} value={this.state.value} onBlur={this.deActivateEditMode} onChange={this.handleOnchange}/>
                </div>
            }
        </div>)

    };
}

export default ProfileStatus;