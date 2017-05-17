import React from 'react';
import { connect } from 'react-redux';

class UpdateSocket extends React.Component {

    componentWillMount(){
        this.props.dispatch({type:'CONNECT', token: this.props.jwt, label: 'updates', url: '/students/'})
    }

    componentWillUnmount(){
        this.props.dispatch({type:'DISCONNECT', label: 'updates'})
    }

	render() {
		return (
            <div></div>
		)
	}
}

export default connect((store) => {
    return {
        jwt: store.account.jwt,
    };
})(UpdateSocket);