import React from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import ForumUpdateSocket from './forumupdatesocket.js';
import Forum from './forum.js';
import Topic from './topic.js';
import Thread from './thread.js';
import ForumMessages from './forummessages.js';

class Forums extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			openMessages: false
		}
	}

	openMessages(){
		this.setState({
			openMessages: !this.state.openMessages
		})
	}

	markRead(message){
		this.props.dispatch({type:'SEND_MESSAGE', token: this.props.jwt, label: 'forums-updates', message: {'id': message.id, 'type': 'reply'}})
	}

	render() {
		return (           
            <div className={this.props.portal_hide ? "forums-full" : "forums"}>
            	<ForumUpdateSocket/>
            	<div className="forum-messages-count" onClick={this.openMessages.bind(this)}> <span className="forum-messages-count-toggle"> Unread Messages - {this.props.unread_messages.length} </span> </div>
				{this.state.openMessages ? <ForumMessages unread_messages={this.props.unread_messages} read_messages={this.props.read_messages} markRead={this.markRead.bind(this)} /> : (null)}

				<Route exact path="/students/forums/" component={Forum}/>
				<Route exact path="/students/forums/:topic_id/" component={Topic}/>
				<Route exact path="/students/forums/:topic_id/:thread_id/" component={Thread}/>
            </div>
		)
	}
}

export default connect((store) => {
    return {
    	portal_hide: store.account.portal_hide,
    	unread_messages: store.forum.reply_updates_unread,
    	read_messages: store.forum.reply_updates_read,
    	jwt: store.account.jwt,
    };
})(Forums);