import React from 'react';
import { connect } from 'react-redux';
import TopicLink from './topiclink.js';

class Forum extends React.Component {

    setTopicToRead(topic_id){
        this.props.dispatch({type:'SEND_MESSAGE', token: this.props.jwt, label: 'forums-updates', message: {'type': 'topic', 'id': topic_id}})
    }

	render() {
		return (
            <div className={this.props.portal_hide ? "forum-full" : "forum"}>
            	<p className="forum-title">Topics:</p>
            	{this.props.groups.length > 0 ?
            		<div className="forum-topics">
            		{this.props.groups[0].topics.map((topic, index) =>
                        <TopicLink topic={topic} topic_dict={this.props.topic_dict} key={index} setTopicToRead={this.setTopicToRead.bind(this)}/>
            		)}
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
    	groups : store.account.groups,
        portal_hide: store.account.portal_hide,
        topic_dict: store.forum.topic_dict,
        jwt: store.account.jwt,
    };
})(Forum);