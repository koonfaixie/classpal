import React from 'react';

export default class Message extends React.Component {
	constructor(props) {
		super(props)
		this.date = new Date(this.props.message.timestamp)
		this.days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
	}

	showDate(){
		this.setState({
			showDate: !this.state.showDate
		})
	}

	showUser(){
		this.setState({
			showUser: !this.state.showUser
		})
	}

	componentWillMount(){
		if (this.props.lastmessage != null) {
			var date = new Date(this.props.lastmessage.timestamp)
			if (this.props.lastmessage.full_name == this.props.message.full_name) {
				this.sameUser = true
			} else {
				this.sameUser = false
			}
			if (date.getDate() == new Date(this.props.message.timestamp).getDate()) {
				this.classNameSameUser = "modal-chat-message-same"
				this.classNameDifferentUser = "modal-chat-message"
				this.state = {
					showDate: false,
					showUser: false
				}
			} else {
				this.classNameSameUser = "modal-chat-message-same new-date"
				this.classNameDifferentUser = "modal-chat-message new-date"
				this.state = {
					showDate: true,
					showUser: false
				}
			}
		} else {
			this.sameUser = false
			this.state = {
				showDate: true,
				showUser: false
			}
			this.classNameSameUser = "modal-chat-message-same"
			this.classNameDifferentUser = "modal-chat-message"
		}
	}

	render() {
		return (
			<tr className={this.sameUser ? this.classNameSameUser : this.classNameDifferentUser}>
				<td className="modal-chat-text">{this.props.message.message}</td>
				{this.sameUser ? <td className="modal-chat-user cursorPointer" onClick={this.showUser.bind(this)}>{this.state.showUser ? (this.props.message.full_name) : (null) }</td> : <td className="modal-chat-user">{this.props.message.full_name}</td>}
				<td className="modal-chat-time" onClick={this.showDate.bind(this)}>{this.date.getHours()%12 == 0 ? 12 : this.date.getHours()%12 }:{this.date.getMinutes() > 9 ? (this.date.getMinutes()) : (<span>0{this.date.getMinutes()}</span>)} { this.date.getHours() > 11 ? 'PM' : 'AM'} <br/> {this.state.showDate ? <span> {this.days[this.date.getDay()]}, {this.date.getMonth()}/{this.date.getDate() > 9 ? (this.date.getDate()) : (<span>0{this.date.getDate()}</span>)} </span> : null}</td>
			</tr>
		)
	}
}
