import React from 'react';
import { connect } from 'react-redux';

const SubmitButton = ({ register }) =>
  <button type="submit">
    Submit
  </button>;

SubmitButton.propTypes = {
  form: React.PropTypes.shape({
  	register: React.PropTypes.shape({
	    register_code: React.PropTypes.string.isRequired,
	    first_name: React.PropTypes.string.isRequired,
	    last_name: React.PropTypes.string.isRequired,
	    email_address: React.PropTypes.string.isRequired,
	    username: React.PropTypes.string.isRequired,
	    password: React.PropTypes.string.isRequired,
	    password_confirm: React.PropTypes.string.isRequired,
	})
  }).isRequired,
};

const mapStateToProps = ({ form }) => ({ form });

export default connect(mapStateToProps)(SubmitButton);