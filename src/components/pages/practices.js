import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Line } from 'rc-progress';
import axios from 'axios';

class Practices extends React.Component {

    componentWillMount(){
	    this.props.dispatch({type: "OBTAIN_PRACTICE_PROGRESS", payload: axios.get("/students/practices_progress/")})
    }

	render() {
		return (
			<div className={this.props.portal_hide ? "practices-full" : "practices"}>
				{this.props.groups.length > 0 ?
	                <div>
	                    <p className="page-title">Practices</p>
	                    { this.props.progress_fetched ?
		                    <div className="practices-list">
			                    {this.props.groups[0].practices.map((practice, index) =>
			                    	<div key={index}> <div className="practice-name"><Link to={"/students/practices/"+practice.id+"/1/"}> {practice.name} </Link> </div> <div className="practice-progress"> Progress: {this.props.practices_progress[practice.id] ? <span>{this.props.practices_progress[practice.id]['percent'] == 100 ? <span>{this.props.practices_progress[practice.id]['completed'] ? 'Completed' : 'Not yet submitted'}</span> : <span> {String(this.props.practices_progress[practice.id]['percent'].toFixed(2))}% </span> }</span> : '0%'}  <Line className="practice-progress-bar" percent={this.props.practices_progress[practice.id] ? String(this.props.practices_progress[practice.id]['percent']) : '0'} strokeWidth="5" strokeColor="lightgreen" /> </div> </div>
			                    	)}
			               	</div>
			               	:
			               	<div></div>
			            }
	                </div>
	                :
	                <div> No Practices Available </div>
	            }
            </div>
		)
	}
}

export default connect((store) => {
    return {
    	groups: store.account.groups,
    	practices_progress: store.practice.practices_progress,
    	portal_hide: store.account.portal_hide,
    	progress_fetched: store.practice.progress_fetched,
    };
})(Practices);