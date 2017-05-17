import React from 'react';
import Reply from './reply.js';

export default class Replies extends React.Component {
	
	componentWillMount(){
		this.hash = this.props.location.hash
	}

	componentDidMount(){
		const string = String(this.hash.replace('#',''))
		if (this.refs[string]) {
			this.refs[string].scrollIntoView({behavior: "smooth"});
		}
	}

	replyToReply(reply, index){
		this.props.replyToReply(reply, index)
	}

	goToReply(id){
		this.refs[id].scrollIntoView({behavior: "smooth"});
	}

	render() {
		return (
			<div className="forum-replies">
				<h4> Replies: </h4>
				{this.props.replies.map((reply, index) =>
					<div id={String(reply.id)} ref={String(reply.id)} className="forum-reply" key={index}>
						<Reply reply={reply} replyToReply={this.replyToReply.bind(this)} goToReply={this.goToReply.bind(this)} index={index}/>
					</div>
				)}
			</div>
		)
	}
}
