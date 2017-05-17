import React from "react";
import { connect } from "react-redux"
import { Field, Form, Errors } from "react-redux-form";
import { login } from "../../actions/AccountActions.js"

import axios from "axios";

import SubmitButton from './loginsubmitbutton';

axios.defaults.xsrfHeaderName = "X-CSRFToken";

const isRequired = (val) => val && val.length > 0;

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(val) {
        login(val)
    }

    render() {
        return (
                <Form 
                    model="form.login" 
                    onSubmit={this.handleSubmit}
                >
                    <Field
                        model="login.username"
                        validators={{
                            isRequired,
                      }}
                    >
                        <input className="login-input" type="text" placeholder="Username"/>
                        <Errors
                            wrapper="div"
                            className="error"
                            show={{ touched: true, focus: false }}
                            model="login.username"
                            messages={{
                              isRequired: (value, { isRequired }) => 'Please provide a valid username.',
                            }}
                        />
                    </Field>

                    <Field 
                        model="login.password" 
                        validators={{ isRequired }}
                    >
                      <input className="login-input" type="password" placeholder="Password"/>
                      <Errors
                        wrapper="div"
                        className="error"
                        show={{ touched: true, focus: false }}
                        model="login.password"
                        messages={{
                          isRequired: (value, { isRequired }) => 'Please provide a valid password.',
                        }}
                      />
                    </Field>

                    <SubmitButton />

                </Form>
        )
    }
}

LoginForm.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

export default connect((store) => {
    return {
        jwt: store.account.jwt,
    };
})(LoginForm);
