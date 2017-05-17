import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import RegisterForm from './registerform.js'

class Register extends React.Component {

	render() {
		return (
			<div className="register">
				<div className="register-header"> Register </div>
				<div><RegisterForm location={this.props.location}/></div>
				<div> <Link to="/students">Already have an account?</Link></div>
			</div>
		)
	}
}

export default connect()(Register);