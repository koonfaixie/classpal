import React from "react"
import LoginForm from './loginform.js'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class Login extends React.Component {

    render() {
        return (
            <div className="login">
                <div className="login-header"> Login </div>
                <div><LoginForm location={this.props.location}/></div>
                <div><Link to='/passwordreset'>Forgot your password?</Link></div>
                <div>Need an account? <Link to='/register'>Register here!</Link></div>
            </div>
        );
    }
}

export default connect()(Login);