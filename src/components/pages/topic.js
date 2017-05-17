import React from 'react';
import { connect } from 'react-redux';
import ThreadLink from './threadlink.js';
import { Link } from "react-router-dom";

class Topic extends React.Component {

	componentWillMount(){
		this.state = {
			newThread: false,
			title: '',
			text: '',
			position: 0,
			start: 0,
		}
		this.props.dispatch({type: 'CONNECT', url: '/students/forums/'+this.props.match.params.topic_id+'/0/', label: 'forums-'+this.props.match.params.topic_id, token: this.props.jwt})
	}

	componentWillUnmount(){
		this.props.dispatch({type: 'DISCONNECT', label: 'forums-'+this.props.match.params.topic_id})
		this.props.dispatch({type: 'DROP_FORUMS'})
	}

	newThread(){
		this.setState({
			newThread: !this.state.newThread
		})
	}

	handleTitle(e){
		this.setState({
			title: e.target.value
		})
	}

	handleText(e){
		this.setState({
			text: e.target.value
		})
	}

	checkTabKey(e){
		if(e.keyCode==9){
			e.preventDefault()
			let val = e.currentTarget.value,
				start = e.target.selectionStart,
				end = e.target.selectionEnd;
			this.setState({text: val.substring(0, start) + '\t' + val.substring(end)}, function() {this.refs.input.selectionStart = this.refs.input.selectionEnd = start + 1})
		}
	}

	insertCode(){
		this.setState({text: this.state.text.substring(0, this.state.position) + '\n<code>***\n\t(write your code here)\n<code>\n' + this.state.text.substring(this.state.position)},
			function() {this.setState({start: this.state.position + 11},
			function() {this.refs.input.focus(); 
						this.refs.input.selectionStart = this.refs.input.selectionEnd = this.state.start + 1 })})
	}

	savePosition(e){
		this.setState({
			position: e.target.selectionStart
		})
	}

	createThread(){
		let promise = new Promise((resolve, reject) => {this.props.dispatch({type: 'SEND_MESSAGE', token: this.props.jwt, label: 'forums-'+this.props.match.params.topic_id, message: {'type': 'create_thread', 'title': this.state.title, 'text': this.state.text}})})
		let promise2 = new Promise((resolve, reject) => {this.setState({ newThread: false })})
		promise.then(()=>{ promise2 })
	}

	setThreadToRead(thread_id){
		this.props.dispatch({type:'SEND_MESSAGE', token: this.props.jwt, label: 'forums-updates', message: {'type': 'thread', 'id': thread_id}})
	}

	render() {
		return (
			<div>
                <div className={this.props.portal_hide ? "forum-full" : "forum"}>
                	{this.props.threads ? 
                		<div>
                			{ this.state.newThread ?
                				<div className="forum-thread-new">
                					<div className="forum-thread-back-button"> <button onClick={this.newThread.bind(this)}> Back </button> </div>	
                					<div className="forum-thread-new-title"> <div> Title: </div> <div> <input onChange={this.handleTitle.bind(this)} value={this.state.title} className="forum-thread-new-title-input"/> </div> </div>
                					<div className="forum-thread-new-text"> <div> Text: </div>  <div> <textarea ref="input" onBlur={this.savePosition.bind(this)} onKeyDown={this.checkTabKey.bind(this)} value={this.state.text} onChange={this.handleText.bind(this)} className="forum-thread-new-text-input"/> </div> </div>
	                				<div className="forum-thread-new-options">
	                					<div className="forum-thread-new-insert-code"> <button onClick={this.insertCode.bind(this)}> Insert code </button> </div>
	                					<div className="forum-thread-new-submit"> <button onClick={this.createThread.bind(this)}> Create thread </button> </div>
	                				</div>
                				</div>
                				:
                				<div>
		                			<div className="forum-new-thread-button"> <button onClick={this.newThread.bind(this)}> New thread </button> </div>
				                	<p className="forum-title"> <Link to="/students/forums/">Topics</Link> > {this.props.topics[this.props.match.params.topic_id]}</p>
				                		<h4>Threads:</h4>
				                		{this.props.threads[this.props.match.params.topic_id] ? 
				                			<div className="forum-threads">
						                		{this.props.threads[this.props.match.params.topic_id].map((thread, index) =>
						                			<ThreadLink key={index} thread={thread} setThreadToRead={this.setThreadToRead.bind(this)} topic_id={this.props.match.params.topic_id} thread_dict={this.props.thread_dict}/>
						                			)}
						                	</div>
						                	:
						                	(
						                	<span> </span>
						                		)
						                }
					            </div>
					        }
	                	</div>
	                	:
	                	(null)
	                }
                </div>
			</div>
		)
	}
}

export default connect((store) => {
    return {
    	jwt: store.account.jwt,
    	topics: store.account.topics,
    	threads: store.forum.threads,
    	groups: store.account.groups,
    	portal_hide: store.account.portal_hide,
    	thread_dict: store.forum.thread_dict,
    };
})(Topic);