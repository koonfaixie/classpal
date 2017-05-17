import React from 'react';
import { Link } from "react-router-dom";

export default class ThreadLink extends React.Component {
	constructor(props) {
		super(props)
		this.days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
	}

	setThreadToRead(){
		if (this.props.thread_dict[this.props.thread.id]) {
			this.props.setThreadToRead(this.props.thread.id)
		}
	}

	render() {
		return (
			<div className="forum-thread">
				<div className="forum-thread-title"><Link to={'/students/forums/'+this.props.topic_id+'/'+this.props.thread.id+'/'}><span onClick={this.setThreadToRead.bind(this)}>{this.props.thread.title}</span></Link> {this.props.thread_dict[this.props.thread.id] ? (<span className="thread-new"> <i className="fa fa-bell" aria-hidden="true"></i> </span>) : (null)} </div>
				<div className="forum-thread-owner">{this.props.thread.owner.first_name+' '+this.props.thread.owner.last_name[0]}</div>
				<div className="forum-thread-date">{this.days[(new Date(this.props.thread.date_added).getDay())]}, {(new Date(this.props.thread.date_added).getMonth())}/{(new Date(this.props.thread.date_added).getDate())}</div>
			</div>
		)
	}
}
