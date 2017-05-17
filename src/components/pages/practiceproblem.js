import React from 'react';
import { Link } from "react-router-dom";

export default class PracticeProblem extends React.Component {

	update(){
		this.props.dispatch({type: 'UPDATE_PRACTICE_ANSWERS', problem: this.props.problem.number})
	}

	render() {
		return (
			<li onClick={this.update.bind(this)}> 
				<Link to={"/students/practices/"+this.props.practice_id+"/"+this.props.problem.number}> Question {this.props.problem.number} - {this.props.completed_problems_list[this.props.problem.number].multiple_choice ? (<span>{this.props.completed_problems_list[this.props.problem.number].correct ? 'Correct' : 'Incorrect'}</span>) : ('Not yet graded')} </Link>
			</li>
		)
	}
}
