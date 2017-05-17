import React from 'react';
import Message from '../pages/message.js';
import VisibilitySensor from 'react-visibility-sensor';


export default class Messages extends React.Component {
	constructor(props) {
		super(props)
		this.scrolledDown = true
		this.state = {
			new_message_alert : false
		}
	}

	componentDidMount() {
		this.scrollToBottom()
	}

    componentDidUpdate() {
    	if (this.scrolledDown && this.props.newMessage == true) {
    		this.scrollToBottom()
    		this.props.dispatch({type:'SCROLLED_BOTTOM'})
    	} else if (this.scrolledDown == false && this.props.newMessage == true) {
    		if (this.state.new_message_alert == false) {
    			this.setState({ new_message_alert : true })
    		}
    	} else {
    	}
    }

    scrollToBottom(){
        this.refs.bottom.scrollIntoView({behavior: "smooth"});
    }

    onChange(isVisible){
    	if (isVisible == true){
    		this.scrolledDown = true
    		if (this.state.new_message_alert == true) {
    			this.setState({
    				new_message_alert: false
    			})
    		} 
    	} else {
    		this.scrolledDown = false
    	}
    }

	render() {
		return (
			<td>
	            <div className="scrolldiv">
	                <table>
	                	<tbody>
				            { this.props.messages.length > 0 ?
				                this.props.messages.map((message, index) =>
				                    <Message key={index} message={message} lastmessage={index == 0 ? (null) : this.props.messages[index-1]}/>
				                    )
				            : (null)
				            }
				            <tr style={ {float:"left", clear: "both"} }
				            ref="bottom"><td><VisibilitySensor onChange={this.onChange.bind(this)}/></td></tr>
				        </tbody>
	                </table>
	            </div>
	            { this.state.new_message_alert ? <div onClick={this.scrollToBottom.bind(this)} className="modal-message-alert"> New Message!</div> : (null)}
           	</td>
		)
	}
}
