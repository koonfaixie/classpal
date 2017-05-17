import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Line } from 'rc-progress';
import axios from 'axios';

class Assignments extends React.Component {

    componentWillMount(){
	    this.props.dispatch({type: "OBTAIN_ASSIGNMENT_PROGRESS", payload: axios.get("/students/assignments_progress/")})
    }

	render() {
		return (
			<div className={this.props.portal_hide ? "assignments-full" : "assignments"}>
				{this.props.groups.length > 0 ?
	                <div>
	                    <p className="page-title">Assignments</p>
	                    { this.props.progress_fetched ?
		                    <div className="assignments-list">
			                    {this.props.groups[0].assignments.map((assignment, index) =>
			                    	<div key={index}> <div className="assignment-name"><Link to={"/students/assignments/"+assignment.id+"/1/"}> {assignment.name} </Link> </div> <div className="assignment-progress"> Progress: {this.props.assignments_progress[assignment.id] ? <span>{this.props.assignments_progress[assignment.id]['percent'] == 100 ? <span>{this.props.assignments_progress[assignment.id]['completed'] ? 'Completed' : 'Not yet submitted'}</span> : <span> {String(this.props.assignments_progress[assignment.id]['percent'].toFixed(2))}% </span> }</span> : '0%'}  <Line className="assignment-progress-bar" percent={this.props.assignments_progress[assignment.id] ? String(this.props.assignments_progress[assignment.id]['percent']) : '0'} strokeWidth="5" strokeColor="lightgreen" /> </div> </div>
			                    	)}
			               	</div>
			               	:
			               	<div></div>
			            }
	                </div>
	                :
	                <div> No Assignments Available </div>
	            }
            </div>
		)
	}
}

export default connect((store) => {
    return {
    	groups: store.account.groups,
    	assignments_progress: store.assignment.assignments_progress,
    	portal_hide: store.account.portal_hide,
    	progress_fetched: store.assignment.progress_fetched,
    };
})(Assignments);