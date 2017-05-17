import React from 'react';
import ForumMessage from './forummessage.js'

export default class ForumMessages extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showRead: false,
		}
	}

	showReadToggle(){
		this.setState({
			showRead: !this.state.showRead
		})
	}

	markRead(message){
		this.props.markRead(message)
	}

	render() {
		return (           
            <div className="forum-messages">
            	<div className="forum-messages-unread">
	            	{this.props.unread_messages.map((message, index) =>
	            		<ForumMessage message={message} key={index} markRead={this.markRead.bind(this)} read={false}/>
	            	)}
            	</div>
            	<div className="forum-messages-toggle">
            		<button onClick={this.showReadToggle.bind(this)}> {this.state.showRead ? 'Hide' : 'Show' } old messages </button>
            	</div>
            	{ this.state.showRead ?
	            	<div className="forum-messages-read">
		            	{this.props.read_messages.map((message, index) =>
		            		<ForumMessage message={message} key={index} markRead={this.markRead.bind(this)} read={true}/>
		            	)}
	            	</div>
	            	:
	            	(null)
	            }
            </div>
		)
	}
}
