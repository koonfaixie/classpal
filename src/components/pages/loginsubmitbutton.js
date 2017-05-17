import React from 'react';
import { connect } from 'react-redux';

const SubmitButton = ({ login }) =>
  <button type="submit">
    Submit
  </button>;

SubmitButton.propTypes = {
  form: React.PropTypes.shape({
  	login: React.PropTypes.shape({
	    username: React.PropTypes.string.isRequired,
	    password: React.PropTypes.string.isRequired,
	})
  }).isRequired,
};

const mapStateToProps = ({ form }) => ({ form });

export default connect(mapStateToProps)(SubmitButton);