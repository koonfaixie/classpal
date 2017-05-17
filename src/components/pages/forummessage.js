import React from 'react';
import { Link } from "react-router-dom";

export default class ForumMessage extends React.Component {
	constructor(props) {
		super(props)
		this.date = new Date(this.props.message.data.date_added)
	}

	markRead(){
		this.props.markRead(this.props.message)
	}

	render() {
		return (           
			<div className="forum-message">
				<div className="forum-message-link">
					<Link to={"/students/forums/"+(this.props.message.data.thread.topic)+"/"+(this.props.message.data.thread.id)+"/#"+(this.props.message.data.id)}> from {this.props.message.data.owner.first_name+' '+this.props.message.data.owner.last_name[0]}</Link> {this.props.read ? (null) : (<span className="forum-message-mark-read" onClick={this.markRead.bind(this)}> Mark as read </span>) }
				</div>
				<div className="forum-message-text">
					{this.props.message.data.text}
					<div className="forum-message-date">
						{(this.date.getMonth())}/{(this.date.getDate())}, {this.date.getHours()%12 == 0 ? 12 : this.date.getHours()%12 }:{this.date.getMinutes() > 9 ? (this.date.getMinutes()) : (<span>0{this.date.getMinutes()}</span>)} { this.date.getHours() > 11 ? 'PM' : 'AM'}
					</div>
				</div>
			</div>
		)
	}
}
