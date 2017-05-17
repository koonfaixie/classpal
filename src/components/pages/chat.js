import React from 'react';

export default class Chat extends React.Component {

	openChat(){
		this.props.openChat(this.props.chat.receivedfrom.label, this.props.chat.receivedfrom.name)
	}

	render() {
		return (
			<div onClick={this.openChat.bind(this)}> <span className="chatroom">{this.props.chat.receivedfrom.name}</span> {this.props.chat.read ? (null) : (<span className="chatroom-new"><i className="fa fa-bell" aria-hidden="true"></i></span>)} </div>
		)
	}
}
