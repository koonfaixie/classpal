import React from 'react';

export default class Reply extends React.Component {

	replyToReply(){
		this.props.replyToReply(this.props.reply, (this.props.index+1))
	}

	goToReply(){
		this.props.goToReply(this.props.reply.reply_to_message_id)
	}

	render() {
		return (
			<div>
				{this.props.reply.reply_to_user ? <div className="forum-reply-from"> <div className="forum-reply-from-text"> <a className="cursorPointer" onClick={this.goToReply.bind(this)}>replied to {this.props.reply.reply_to_user.first_name+' '+this.props.reply.reply_to_user.last_name[0]}:</a>
				{this.props.reply.reply_to_message.split("<code>").map((item_code, index) =>
					<div key={index}>
						{item_code.includes("***") ? 
							<div className="forum-reply-code">{item_code.replace("***","").split("\n").map((item, index) =>
								<span style={{ whiteSpace: 'nowrap' }} key={index}>
									{item.replace(/\t/g, '    ').replace(/ /g, "\u00a0")}
									{item.length > 0 ? <br/> : (null)}
								</span>
								)}
							</div>
							:
							<div>{item_code.split("\n").map((item, index) =>
								<span key={index}>
									{item.replace(/\t/g, '    ')}
									{item.length > 0 ? <br/> : (null)}
								</span>
								)}
							</div>
						}
					</div>
				)}
				</div> </div> : (null)}
				<div className="forum-reply-text">
				{this.props.reply.text.split("<code>").map((item_code, index) =>
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
				</div> 
				<div className="forum-reply-details"> 
					<div className="forum-reply-details-number"> {this.props.index+1} | </div> 
					<div className="forum-reply-details-reply" onClick={this.replyToReply.bind(this)}> REPLY </div> 
					<div className="forum-reply-details-user">{this.props.reply.owner.first_name+' '+this.props.reply.owner.last_name[0]} - {(new Date(this.props.reply.date_added).getMonth())}/{(new Date(this.props.reply.date_added).getDate())}, {new Date(this.props.reply.date_added).getHours()%12 == 0 ? 12 : new Date(this.props.reply.date_added).getHours()%12 }:{new Date(this.props.reply.date_added).getMinutes() > 9 ? (new Date(this.props.reply.date_added).getMinutes()) : (<span>0{new Date(this.props.reply.date_added).getMinutes()}</span>)} { new Date(this.props.reply.date_added).getHours() > 11 ? 'PM' : 'AM'}</div>
				</div>
			</div>
		)
	}
}
