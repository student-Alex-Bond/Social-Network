import React, {ChangeEvent} from 'react';

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<ProfileStatusType> = (props) => {
    const [status, setStatus] = React.useState<string>(props.status)
    const [editMode, setEditMode] = React.useState<boolean>(false)

    React.useEffect(()=> {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deActivateEditMode = () => {
        props.updateStatus(status)
        setEditMode(false)

    }

    const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    return (<div>
        {!editMode
            ? <div>
                <span onDoubleClick={activateEditMode}>{props.status || 'no status'}</span>
            </div>
            : <div>
                <input autoFocus={true} value={status} onBlur={deActivateEditMode}
                       onChange={handleOnchange}/>
            </div>
        }
    </div>)

};


export default ProfileStatus;