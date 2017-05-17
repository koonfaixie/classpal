import React from 'react';
import { connect } from 'react-redux';
import Replies from './replies.js';
import { Link } from "react-router-dom";

class Thread extends React.Component {

	componentWillMount(){
		this.state = { start: null, position: 0, reply_to_user: null, reply_to_message: null, reply_to_message_id: null, reply_index: null}
		this.props.dispatch({type: 'CONNECT', url: '/students/forums/'+this.props.match.params.topic_id+'/'+this.props.match.params.thread_id+'/', label: 'forums-'+this.props.match.params.topic_id+'-'+this.props.match.params.thread_id, token: this.props.jwt})
	}

	componentWillUnmount(){
		this.props.dispatch({type: 'DISCONNECT', label: 'forums-'+this.props.match.params.topic_id+'-'+this.props.match.params.thread_id})
		this.props.dispatch({type: 'DROP_FORUMS'})
	}

	componentDidUpdate(){
		if (this.state.start != null){
			this.refs.input.focus()
			this.refs.input.selectionStart = this.refs.input.selectionEnd = this.state.start + 1
			this.setState({start: null})
		}
	}

	goToReply(){
		this.refs.reply.scrollIntoView({behavior: "smooth"});
	}

	replyInputHandle(e){
		this.props.dispatch({type: 'UPDATE_FORUM_REPLY_INPUT', payload: e.target.value})
	}

	checkTabKey(e){
		if(e.keyCode==9){
			e.preventDefault()
			let val = e.currentTarget.value,
				start = e.target.selectionStart,
				end = e.target.selectionEnd;
			let promise = new Promise((resolve, reject) => {this.props.dispatch({type: 'UPDATE_FORUM_REPLY_INPUT', payload: val.substring(0, start) + '\t' + val.substring(end)})})
			let promise2 = new Promise((resolve, reject) => {this.setState({start: start})})
			promise.then(() => { promise2 })
		}
	}

	insertCode(){
		let promise = new Promise((resolve, reject) => {this.props.dispatch({type: 'UPDATE_FORUM_REPLY_INPUT', payload: this.props.reply_input.substring(0, this.state.position) + '\n<code>***\n\t(write your code here)\n<code>\n' + this.props.reply_input.substring(this.state.position)})})
		let promise2 = new Promise((resolve, reject) => {this.setState({start: this.state.position + 11})})
		promise.then(() => { promise2 })
	}

	saveInputPosition(e){
		let	start = e.target.selectionStart
		this.setState({ position: start})	
	}

	replyToReply(reply, index){
		this.setState({ reply_to_user: reply.owner.id, reply_to_message: reply.text, reply_to_message_id: reply.id, reply_index: index}, function() {this.goToReply()})
	}

	cancelReply(){
		this.setState({ reply_to_user: null, reply_to_message: null, reply_to_message_id: null, reply_index: null})
	}

	submit(){
		let promise = new Promise((resolve,reject) => {this.props.dispatch({type: 'SEND_MESSAGE', token: this.props.jwt, label: 'forums-'+this.props.match.params.topic_id+'-'+this.props.match.params.thread_id, message: {'reply_to_user': this.state.reply_to_user, 'reply_to_message': this.state.reply_to_message, 'reply_to_message_id': this.state.reply_to_message_id, 'text': this.props.reply_input} })})
		let promise2 = new Promise((resolve,reject) => {this.setState({start: null, position: 0, reply_to_user: null, reply_to_message: null, reply_to_message_id: null})})
		let promise3 = new Promise((resolve, reject) => {this.props.dispatch({type: 'UPDATE_FORUM_REPLY_INPUT', payload: ''})})
		promise.then(() => {promise2.then(() => {promise3})})
	}

	render() {
		return (
			<div>
				{this.props.fetched_thread == true ?
	                <div className={this.props.portal_hide ? "forum-full" : "forum"}>
	                	{this.props.replies ? 
	                		<div>
	                			<div className="forum-send-reply"> <button onClick={this.goToReply.bind(this)}> Reply </button> </div>
			                	<p className="forum-title"> <Link to="/students/forums/">Topics</Link> > <Link to={"/students/forums/"+this.props.match.params.topic_id}>{this.props.topics[this.props.match.params.topic_id]}</Link> > Thread : {this.props.replies[this.props.match.params.thread_id].title}</p>
			                	<div className="forum-thread-init"> <div className="forum-thread-init-text"> 
								{this.props.replies[this.props.match.params.thread_id].text.split("<code>").map((item_code, index) =>
									<div key={index}>
										{item_code.includes("***") ? 
											<p className="forum-reply-code">{item_code.replace("***","").split("\n").map((item, index) =>
												<span style={{ whiteSpace: 'nowrap' }} key={index}>
													{item.replace(/\t/g, '    ').replace(/ /g, "\u00a0")}
													{item.length > 0 ? <br/> : (null)}
												</span>
												)}
											</p>
											:
											<p>{item_code.split("\n").map((item, index) =>
												<span key={index}>
													{item.replace(/\t/g, '    ')}
													{item.length > 0 ? <br/> : (null)}
												</span>
												)}
											</p>
										}
									</div>
								)}
			                	</div> <div className="forum-thread-init-details"> {this.props.replies[this.props.match.params.thread_id].owner.first_name+' '+this.props.replies[this.props.match.params.thread_id].owner.last_name[0]} </div> </div>
		                		{this.props.replies[this.props.match.params.thread_id].replies ? 
									<Replies replies={this.props.replies[this.props.match.params.thread_id].replies} location={this.props.location} replyToReply={this.replyToReply.bind(this)}/>
				                	:
				                	(
				                	<div> </div>
				                		)
				                }
				                <div className="forum-reply-container" ref="reply"> 
				                	<textarea onBlur={this.saveInputPosition.bind(this)} ref="input" className="forum-reply-input" value={this.props.reply_input} onKeyDown={this.checkTabKey.bind(this)} onChange={this.replyInputHandle.bind(this)}/>
				                	<div> {this.state.reply_to_user != null ? <span> Replying to # {this.state.reply_index} <button onClick={this.cancelReply.bind(this)}> cancel </button> </span> : <span> Replying to thread </span>} </div>
				                	<button onClick={this.insertCode.bind(this)} className="forum-reply-insert-code"> Insert Code </button> <button className="forum-reply-send" onClick={this.submit.bind(this)}> Submit </button>
				                </div>
		                	</div>
		                	:
		                	(null)
		                }
	                </div>
                	:
               		(null)
           		}
			</div>
		)
	}
}

export default connect((store) => {
    return {
    	jwt: store.account.jwt,
    	topics: store.account.topics,
    	replies: store.forum.replies,
    	groups: store.account.groups,
    	portal_hide: store.account.portal_hide,
    	reply_input: store.forum.reply_input,
    	fetched_thread: store.forum.fetched_thread,
    };
})(Thread);