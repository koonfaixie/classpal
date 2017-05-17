import React from 'react';
import { connect } from 'react-redux';
import Announcement from './announcement.js';

class Announcements extends React.Component {
	constructor(props) {
		super(props)
        this.state = {
            past: false
        }
	}
    togglePast(){
        this.setState({
            past: !this.state.past
        })
    }

	render() {
		return (
            <div className={this.props.portal_hide ? "announcements-full" : "announcements"}>
                <div className="page-title">Announcements</div>
                <div className="announcements-list">
                    <ul>
                    	{this.props.announcements.map((announcement, index) =>
                        	<div key={index}>
                                {announcement.active == true ?
                                    <Announcement announcement={announcement}/>
                                    :
                                    (null)
                                }
                            </div>
                    		)}
                    </ul>
                </div>

                <div className="announcement-toggle">
                    <button onClick={this.togglePast.bind(this)}> { this.state.past ? 'hide past announcements' : 'show past announcements' } </button>
                </div>

                { this.state.past ?
                    <div className="announcements-list">
                        <ul>
                            {this.props.announcements.map((announcement, index) =>
                                <div key={index}>
                                    {announcement.active == false ?
                                        <Announcement announcement={announcement}/>
                                        :
                                        (null)
                                    }
                                </div>
                                )}
                        </ul>
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
    	announcements: store.account.announcements,
        portal_hide: store.account.portal_hide,
    };
})(Announcements);