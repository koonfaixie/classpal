import React from 'react';
import { Link } from "react-router-dom";

export default class TopicLink extends React.Component {

	setTopicToRead(){
		if (this.props.topic_dict[this.props.topic.id]) {
			this.props.setTopicToRead(this.props.topic.id)
		}
	}

	render() {
		return (
            <div className="forum-topic">
            <Link to={"/students/forums/"+this.props.topic.id}><span onClick={this.setTopicToRead.bind(this)}>{this.props.topic.name}</span></Link> 
            {this.props.topic_dict[this.props.topic.id] ? (<span className="topic-new"> <i className="fa fa-bell" aria-hidden="true"> </i></span>) : (null)}
            </div>
		)
	}
}
