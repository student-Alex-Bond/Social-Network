import React from 'react';
import {Field, reduxForm, InjectedFormProps} from "redux-form";

type FormData ={
    login: string
    password: string
    rememberMe: boolean
}

const LoginPage = () => {

    const onSubmit = (formData: FormData) => {
        console.log(formData)
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
        <form onSubmit ={props.handleSubmit} >
            <div>
                <Field  name={'login'} type={'text'} placeholder={'login'} component={'input'}/>
            </div>
            <div>
                <Field name={'password'} type={'password'} placeholder={'password'} component={'input'}/>
            </div>
            <div>
                <Field name={'rememberMe'} type={'checkbox'} component={'input'} /> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const ReduxLoginForm = reduxForm<FormData>({
    form: 'login'
})(LoginForm)
export default LoginPage;