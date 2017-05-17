import React from "react"
import { connect } from 'react-redux';
import axios from 'axios';

class PasswordReset extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: ''
        }
    }

    handleInput(e){
        this.setState({ email: e.target.value })
    }

    passwordReset(){
        this.props.dispatch({type: "RESET_PASSWORD", payload: axios.post("/password_reset/", {email: this.state.email}) })
    }

    render() {
        return (
            <div className="password-reset">
                <div className="password-reset-header"> Password Reset </div>
                <div> Email: <input type="email" onChange={this.handleInput.bind(this)} value={this.state.email} placeholder="email"/> <button onClick={this.passwordReset.bind(this)}> {this.props.fetching ? 'submitting...' : 'submit'} </button> </div>
                {this.props.fetched ? <div> Success! Instructions on how to reset your password has been sent to your email address. </div> : (null)}
            </div>
        );
    }
}

export default connect((store) => {
    return {
        fetching: store.account.fetching_password_reset,
        fetched: store.account.fetched_password_reset,
    }
})(PasswordReset);

