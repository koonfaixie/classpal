import React from 'react';
import { connect } from 'react-redux';

class ForumUpdateSocket extends React.Component {

    componentWillMount(){
        this.props.dispatch({type: 'CONNECT', url: '/students/forums_updates/', label: 'forums-updates', token: this.props.jwt, })
    }

    componentWillUnmount(){
        this.props.dispatch({type:'DISCONNECT', label: 'forums-updates'})
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
})(ForumUpdateSocket);