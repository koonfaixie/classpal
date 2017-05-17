import React from "react";
import { connect } from "react-redux"
import { Field, Form, Errors } from "react-redux-form";
import { push } from 'react-router-redux'

import axios from "axios";

import SubmitButton from './registersubmitbutton';

axios.defaults.xsrfHeaderName = "X-CSRFToken";

const emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isRequired = (val) => val && val.length > 0;

const isEmail = (val) => emailregex.test(val);


class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(val) {
        const promise = axios.post("/accounts/", val)
        this.props.dispatch({type: "REGISTER_USER", payload: promise }).then((response) => {
            if (response.value.data['success']) {
                this.props.dispatch(push('/students'));
            } else if (response.value.data['error']){
                this.props.dispatch({type: 'REGISTER_ERROR', payload: response.value.data['error']})            
            }
        })
    }

    render() {
        return (
                <Form 
                    model="form.register" 
                    onSubmit={this.handleSubmit}
                >
                    <Field
                        model="register.register_code"
                        validators={{ isRequired }}
                    >
                        <span className="register-label"> Registration code: </span> 
                        <input className="register-input" type="text" placeholder="Registration code"/>
                        <Errors
                            wrapper="div"
                            className="register-error"
                            show={{ touched: true, focus: false }}
                            model="register.register_code"
                            messages={{
                                isRequired: (value, { isRequired }) => 'Please provide a registration code.',
                            }}
                        />
                    </Field>

                    <Field
                        model="register.first_name"
                        validators={{ isRequired }}
                    >
                        <span className="register-label"> First name: </span> 
                        <input className="register-input" type="text" placeholder="First name"/>
                        <Errors
                            wrapper="div"
                            className="register-error"
                            show={{ touched: true, focus: false }}
                            model="register.first_name"
                            messages={{
                                isRequired: (value, { isRequired }) => 'First name field is required.',
                            }}
                        />
                    </Field>

                    <Field
                        model="register.last_name"
                        validators={{ isRequired }}
                    >
                        <span className="register-label"> Last name: </span> 
                        <input className="register-input" type="text" placeholder="Last name"/>
                        <Errors
                            wrapper="div"
                            className="register-error"
                            show={{ touched: true, focus: false }}
                            model="register.last_name"
                            messages={{
                                isRequired: (value, { isRequired }) => 'Last name field is required.',
                            }}
                        />
                    </Field>

                    <Field
                        model="register.email_address"
                        validators={{ isRequired, isEmail }}
                    >
                        <span className="register-label"> Email address: </span> 
                        <input className="register-input" type="email" placeholder="Email address"/>
                        <Errors
                            wrapper="div"
                            className="register-error"
                            show={{ touched: true, focus: false }}
                            model="register.email_address"
                            messages={{
                                isRequired: (value, { isRequired }) => 'Email field is required.',
                                isEmail: (value, { isRequired }) => 'Please provide a valid email address.',
                            }}
                        />
                    </Field>

                    <Field
                        model="register.username"
                        validators={{ isRequired }}
                    >
                        <span className="register-label"> Username: </span> 
                        <input className="register-input" type="text" placeholder="Username"/>
                        <Errors
                            wrapper="div"
                            className="register-error"
                            show={{ touched: true, focus: false }}
                            model="register.username"
                            messages={{
                                isRequired: (value, { isRequired }) => 'Please provide a valid username.',
                            }}
                        />
                    </Field>

                    <Field 
                        model="register.password" 
                        validators={{ isRequired }}
                    >
                        <span className="register-label"> Password: </span> 
                        <input className="register-input" type="password" placeholder="Password"/>
                        <Errors
                            wrapper="div"
                            className="register-error"
                            show={{ touched: true, focus: false }}
                            model="register.password"
                            messages={{
                                isRequired: (value, { isRequired }) => 'Please provide a valid password.',
                        }}
                        />
                    </Field>

                    <Field 
                        model="register.password_confirm" 
                        validators={{ isRequired }}
                    >
                        <span className="register-label"> Confirm password: </span> 
                        <input className="register-input" type="password" placeholder="Confirm password"/>
                        {this.props.password.length > 0 ? (
                            <Errors
                                wrapper="div"
                                className="register-error"
                                show={{ touched: true, focus: false }}
                                model="register.password_confirm"
                                messages={{
                                    isRequired: (value, { isRequired }) => 'Please confirm your password.',
                                }}
                            />) : (null) }
                    </Field>

                    {this.props.error_message.length > 0 ? (<div className="register-error"> {this.props.error_message} </div>) : (null)}
                    <div className="register-submit">
                        <SubmitButton />
                    </div>

                </Form>
        )
    }
}

RegisterForm.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

export default connect((store) => {
    return {
        error_message: store.account.register_error_message,
        password: store.form.register.password,
        password_confirm: store.form.register.password_confirm,
    };
})(RegisterForm);
