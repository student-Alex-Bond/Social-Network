import React from 'react';
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import {Input} from "../common/formsControls/FormsControls";
import {requiredField} from "../../utills/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import styles from '../common/formsControls/FormsControls.module.css'

type FormData = {
    login: string
    password: string
    rememberMe: boolean
}

const LoginPage = (props: LoginPageType) => {

    const onSubmit = (formData: FormData) => {
        props.login(formData.login, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div style={{marginLeft: '20px'}}>
            <h1>Login</h1>
            <ReduxLoginForm onSubmit={onSubmit}/>
        </div>
    );
};

const LoginForm = (props: InjectedFormProps<FormData>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'login'} type={'text'} placeholder={'login'} validate={[requiredField]} component={Input}/>
            </div>
            <div>
                <Field name={'password'} type={'password'} placeholder={'password'} validate={[requiredField]}
                       component={Input}/>
            </div>
            <div>
                <Field name={'rememberMe'} type={'checkbox'} component={Input}/> remember me
            </div>
            {props.error && <div className={styles.summaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const ReduxLoginForm = reduxForm<FormData>({
    form: 'login'
})(LoginForm)

type MapStatePropsType = {
    isAuth: boolean
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
    }
}

type MapDispatchPropsType = {

    login: (email: string, password: string, rememberMe: boolean) => void
}
export type LoginPageType = MapStatePropsType & MapDispatchPropsType


export default connect(mapStateToProps, {login})(LoginPage);