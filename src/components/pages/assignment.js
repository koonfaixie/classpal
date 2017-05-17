import React from 'react';
import { connect } from 'react-redux';
import AssignmentProblem from './assignmentproblem.js';
import { Link } from "react-router-dom";

class Assignment extends React.Component {

	componentWillMount(){
		this.state = { start: null, position: 0}
		this.props.dispatch({type: 'ASSIGNMENTS_INIT', assignment_id: this.props.match.params.id, problem_id: this.props.match.params.problem_id})
		this.props.dispatch({type: 'CONNECT', url: '/students/assignments/'+this.props.match.params.id+'/', label: 'assignment-'+this.props.match.params.id, token: this.props.jwt})
	}

	componentWillUnmount(){
		this.props.dispatch({type: 'DISCONNECT', label: 'assignment-'+this.props.match.params.id})
		this.props.dispatch({type: 'DROP_ASSIGNMENTS'})
	}

	componentDidUpdate(){
		if (this.state.start != null){
			this.refs.input.focus()
			this.refs.input.selectionStart = this.refs.input.selectionEnd = this.state.start + 1
			this.setState({start: null})
		}
	}

	answerClick(e){
		this.props.dispatch({type: 'UPDATE_ASSIGNMENT_ANSWER_CHOICE', payload: e.currentTarget.value})
	}

	answerInput(e){
		this.props.dispatch({type: 'UPDATE_ASSIGNMENT_ANSWER_TEXT', payload: e.currentTarget.value})
	}

	checkTabKey(e){
		if(e.keyCode==9 || e.which==9){
			e.preventDefault()
			var val = e.currentTarget.value,
			start = e.target.selectionStart,
			end = e.target.selectionEnd;
			let promise = new Promise((resolve, reject) => {this.props.dispatch({type: 'UPDATE_ASSIGNMENT_ANSWER_TEXT', payload: val.substring(0, start) + '\t' + val.substring(end)})})
			let promise2 = new Promise((resolve, reject) => {this.setState({start: start})})
			promise.then(() => { promise2 })
		}
	}

	insertCode(){
		let promise = new Promise((resolve, reject) => {this.props.dispatch({type: 'UPDATE_ASSIGNMENT_ANSWER_TEXT', payload: this.props.answer_text.substring(0, this.state.position) + '\n<code>***\n\t(write your code here)\n<code>\n' + this.props.answer_text.substring(this.state.position)})})
		let promise2 = new Promise((resolve, reject) => {this.setState({start: this.state.position + 11})})
		promise.then(() => { promise2 })
	}

	saveInputPosition(e){
		let start = e.target.selectionStart
		this.setState({ position: start})	
	}

	lastQuestion(){
		var isCompleted = this.props.completed
		if (isCompleted) {
			this.props.dispatch({type: 'UPDATE_ASSIGNMENT_ANSWERS', problem: this.props.match.params.problem_id-1})
		} else {
			var isChoice = this.props.assignments[this.props.match.params.id][this.props.match.params.problem_id-1].multiple_choice
			let send_promise = new Promise((resolve, reject) => {
				this.props.dispatch({type: 'SEND_MESSAGE', token: this.props.jwt, label: 'assignment-'+String(this.props.match.params.id), message: {'obtain_user_answer': false, 'problem_id': (parseInt(this.props.match.params.problem_id)), 'isChoice': isChoice, 'choice_num': this.props.answer_choice, 'answer_text': this.props.answer_text}})
			})
			let send_promise2 = new Promise((resolve,reject) => {
				this.props.dispatch({type: 'CLEAR_ASSIGNMENT_ANSWERS'})
			})
			let send_promise3 = new Promise((resolve,reject) => {
				this.props.dispatch({type: 'SEND_MESSAGE', token: this.props.jwt, label: 'assignment-'+String(this.props.match.params.id), message: {'obtain_user_answer': true, 'problem_id': (parseInt(this.props.match.params.problem_id)-1)}})
			})
			if (isChoice && this.props.answer_choice.length > 0) {
				send_promise.then(()=> { send_promise2.then(()=> { send_promise3 })})
			} else if (!isChoice && this.props.answer_text.length > 0) {
				send_promise.then(()=> { send_promise2.then(()=> { send_promise3 })})
			} else {
				
			}
		}
	}

	nextQuestion(){
		var isCompleted = this.props.completed
		if (isCompleted) {
			this.props.dispatch({type: 'UPDATE_ASSIGNMENT_ANSWERS', problem: (parseInt(this.props.match.params.problem_id)+1)})
		} else {
			var isChoice = this.props.assignments[this.props.match.params.id][this.props.match.params.problem_id-1].multiple_choice
			let send_promise = new Promise((resolve, reject) => {
				this.props.dispatch({type: 'SEND_MESSAGE', token: this.props.jwt, label: 'assignment-'+this.props.match.params.id, message: {'obtain_user_answer': false, 'problem_id': (parseInt(this.props.match.params.problem_id)), 'isChoice': isChoice, 'choice_num': this.props.answer_choice, 'answer_text': this.props.answer_text}})
			})
			let send_promise2 = new Promise((resolve,reject) => {
				this.props.dispatch({type: 'CLEAR_ASSIGNMENT_ANSWERS'})
			})
			let send_promise3 = new Promise((resolve,reject) => {
				this.props.dispatch({type: 'SEND_MESSAGE', token: this.props.jwt, label: 'assignment-'+this.props.match.params.id, message: {'obtain_user_answer': true, 'problem_id': (parseInt(this.props.match.params.problem_id)+1)}})
			})
			if (isChoice && this.props.answer_choice.length > 0) {
				send_promise.then(()=> { send_promise2.then(()=> { send_promise3 })})
			} else if (!isChoice && this.props.answer_text.length > 0) {
				send_promise.then(()=> { send_promise2.then(()=> { send_promise3 })})
			} else {
				
			}
		}

	}

	submit(){
		var isCompleted = this.props.completed
		if (isCompleted) {
		} else {
			var isChoice = this.props.assignments[this.props.match.params.id][this.props.match.params.problem_id-1].multiple_choice
			let send_promise = new Promise((resolve, reject) => {
				this.props.dispatch({type: 'SEND_MESSAGE', token: this.props.jwt, label: 'assignment-'+this.props.match.params.id, message: {'obtain_user_answer': false, 'problem_id': (parseInt(this.props.match.params.problem_id)), 'isChoice': isChoice, 'choice_num': this.props.answer_choice, 'answer_text': this.props.answer_text}})
			})	
			let send_promise2 = new Promise((resolve,reject) => {
				this.props.dispatch({type: 'CLEAR_ASSIGNMENT_ANSWERS'})
			})
			let send_promise3 = new Promise((resolve, reject) => {
				this.props.dispatch({type: 'SEND_MESSAGE', token: this.props.jwt, label: 'assignment-'+this.props.match.params.id, message: {'obtain_user_answer': true, 'problem_id': 'all'}})
			})
			if (isChoice && this.props.answer_choice.length > 0) {
				send_promise.then(()=> { send_promise2.then(()=> { send_promise3 })})
			} else if (!isChoice && this.props.answer_text.length > 0) {
				send_promise.then(()=> { send_promise2.then(()=> { send_promise3 })})
			} else {
				
			}
		}
	}

	render() {
		return (
				<div> 	    
					{this.props.assignments[this.props.match.params.id] ? 
						<div className={this.props.portal_hide ? "assignment-full" : "assignment"}>
							{this.props.match.params.problem_id == 'summary' ?
								<div>
									{this.props.completed ?
										<div>
											<p className="summary-title"> Summary </p>
											<br/>
											<p className="summary-grade"> Grade score: {this.props.score == 'Not yet graded' ? 
															<span className="unavail-score">Not yet graded</span> 
																: 
															<span className={this.props.score > 0.75 ? "good-score" : "bad-score"}> {this.props.score * 100}</span>}</p>
											<div className="summary-list"> 
												<ul> 
													{this.props.assignments[this.props.match.params.id].map((problem, index) =>
														<AssignmentProblem dispatch={this.props.dispatch.bind(this)} key={index} assignment_id={this.props.match.params.id} problem={problem} completed_problems_list={this.props.completed_problems_list}/>
														)}
												</ul>
											</div>
										</div>
										:
										<div>
										</div>
									}
								</div>
								:
								<div>
									{this.props.assignments[this.props.match.params.id].length > this.props.match.params.problem_id-1 ? 
										<div>
												<p className="assignment-title">Question {this.props.assignments[this.props.match.params.id][this.props.match.params.problem_id-1].number}.</p>
												<div className="assignment-question">
													{this.props.assignments[this.props.match.params.id][this.props.match.params.problem_id-1].name.split("<code>").map((item_code, index) =>
														<div key={index}>
															{item_code.includes("***") ? 
																<p className="assignment-question-code">{item_code.replace("***","").split("\n").map((item, index) =>
																	<span style={{ whiteSpace: 'nowrap' }} key={index}>
																		{item.replace(/\t/g, '    ').replace(/ /g, "\u00a0")}
																		{item.length > 0 ? <br/> : (null)}
																	</span>
																	)}
																</p>
																:
																<p className="assignment-question-text">{item_code.split("\n").map((item, index) =>
																	<span key={index}>
																		{item}
																		{item.length > 0 ? <br/> : (null)}
																	</span>
																	)}
																</p>
															}
														</div>
												)}
												</div>
												{this.props.assignments_fetched ? (
													<div className="assignment-answers">
														{this.props.completed ?
															<div>
																{this.props.assignments[this.props.match.params.id][this.props.match.params.problem_id-1].multiple_choice ?
																	<div className="assignment-answer">
																		<p className="your-answer"> Your Answer: </p>
																		{this.props.saved_answer_choice.split("<code>").map((item_code, index) =>
																			<div key={index}>
																				{item_code.includes("***") ? 
																					<p className="assignment-answer-code">{item_code.replace("***","").split("\n").map((item, index) =>
																						<span style={{ whiteSpace: 'nowrap' }} key={index}>
																							{item.replace(/\t/g, '    ').replace(/ /g, "\u00a0")}
																							{item.length > 0 ? <br/> : (null)}
																						</span>
																						)}
																					</p>
																					:
																					<p className="assignment-answer">{item_code.split("\n").map((item, index) =>
																						<span key={index}>
																							{item.replace(/\t/g, '    ')}
																							{item.length > 0 ? <br/> : (null)}
																						</span>
																						)}
																					</p>
																				}
																			</div>
																		)}
																		<div className="answer-separator"> </div>
																		<p className="correct-answer">Correct Answer:</p>
																		{this.props.assignments[this.props.match.params.id][this.props.match.params.problem_id-1].answer.split("<code>").map((item_code, index) =>
																			<div key={index}>
																				{item_code.includes("***") ? 
																					<p className="assignment-answer-code">{item_code.replace("***","").split("\n").map((item, index) =>
																						<span style={{ whiteSpace: 'nowrap' }} key={index}>
																							{item.replace(/\t/g, '    ').replace(/ /g, "\u00a0")}
																							{item.length > 0 ? <br/> : (null)}
																						</span>
																						)}
																					</p>
																					:
																					<p className="assignment-answer">{item_code.split("\n").map((item, index) =>
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
																	:
																	<div className="assignment-answer">
																		<p className="your-answer"> Your Answer: </p> 
																		{this.props.saved_answer_text.split("<code>").map((item_code, index) =>
																			<div key={index}>
																				{item_code.includes("***") ? 
																					<p className="assignment-answer-code">{item_code.replace("***","").split("\n").map((item, index) =>
																						<span style={{ whiteSpace: 'nowrap' }} key={index}>
																							{item.replace(/\t/g, '    ').replace(/ /g, "\u00a0")}
																							{item.length > 0 ? <br/> : (null)}
																						</span>
																						)}
																					</p>
																					:
																					<p className="assignment-answer">{item_code.split("\n").map((item, index) =>
																						<span key={index}>
																							{item.replace(/\t/g, '    ')}
																							{item.length > 0 ? <br/> : (null)}
																						</span>
																						)}
																					</p>
																				}
																			</div>
																		)}
																		<div className="answer-separator"> </div>
																		<p className="correct-answer">Correct Answer:</p>
																		{this.props.assignments[this.props.match.params.id][this.props.match.params.problem_id-1].answer.split("<code>").map((item_code, index) =>
																			<div key={index}>
																				{item_code.includes("***") ? 
																					<p className="assignment-answer-code">{item_code.replace("***","").split("\n").map((item, index) =>
																						<span style={{ whiteSpace: 'nowrap' }} key={index}>
																							{item.replace(/\t/g, '    ').replace(/ /g, "\u00a0")}
																							{item.length > 0 ? <br/> : (null)}
																						</span>
																						)}
																					</p>
																					:
																					<p className="assignment-answer">{item_code.split("\n").map((item, index) =>
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
																}
																<div className="assignment-navigator">
																	{this.props.match.params.problem_id > 1 ? (<Link to={"/students/assignments/"+this.props.match.params.id+"/"+(this.props.match.params.problem_id-1)}> <button onClick={this.lastQuestion.bind(this)}>Back</button> </Link>) : (null)}
																	<Link to={"/students/assignments/"+this.props.match.params.id+"/summary/"}><button onClick={this.submit.bind(this)}> Summary </button> </Link>														
																	{this.props.assignments[this.props.match.params.id].length > this.props.match.params.problem_id ? (<Link to={"/students/assignments/"+this.props.match.params.id+"/"+(parseInt(this.props.match.params.problem_id)+1)}> <button onClick={this.nextQuestion.bind(this)}> Next </button> </Link>) : (null)}
																</div>
															</div>
															:
															<div>
																{this.props.assignments[this.props.match.params.id][this.props.match.params.problem_id-1].multiple_choice ? 
																	<div className="assignment-answer">
																			{this.props.assignments[this.props.match.params.id][this.props.match.params.problem_id-1].choices.map((choice, index) =>
																				<div key={index} className="assignment-answer-choice"><input type="radio" className="assignment-answer-radio" onChange={this.answerClick.bind(this)} checked={this.props.answer_choice == choice.name} value={choice.name}/> 
																					{choice.name.split("<code>").map((item_code, index) =>
																						<div key={index}>
																							{item_code.includes("***") ? 
																								<p className="assignment-answer-code">{item_code.replace("***","").split("\n").map((item, index) =>
																									<span style={{ whiteSpace: 'nowrap' }} key={index}>
																										{item.replace(/\t/g, '    ').replace(/ /g, "\u00a0")}
																										{item.length > 0 ? <br/> : (null)}
																									</span>
																									)}
																								</p>
																								:
																								<p className="assignment-answer-text">{item_code.split("\n").map((item, index) =>
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
																			)}
																	</div>
																	: 
																	<div className="assignment-answer">
																		<div className="assignment-answer-options"> <button onClick={this.insertCode.bind(this)} className="assignment-answer-insert-code"> Insert Code </button> </div>
																		<div className="assignment-answer-input-container">
																			<textarea onBlur={this.saveInputPosition.bind(this)} ref="input" className="assignment-answer-input" onKeyDown={this.checkTabKey.bind(this)} onChange={this.answerInput.bind(this)} value={this.props.answer_text}/>
																		</div>

																	</div>
																}
																<div className="assignment-navigator">
																	{this.props.match.params.problem_id > 1 ? (<Link to={"/students/assignments/"+this.props.match.params.id+"/"+(this.props.match.params.problem_id-1)}> <button onClick={this.lastQuestion.bind(this)}>Back</button> </Link>) : (null)} 
																	{this.props.assignments[this.props.match.params.id].length > this.props.match.params.problem_id ? (<Link to={"/students/assignments/"+this.props.match.params.id+"/"+(parseInt(this.props.match.params.problem_id)+1)}><button onClick={this.nextQuestion.bind(this)}> Next </button></Link>) : (null)}
																	{this.props.assignments[this.props.match.params.id].length == this.props.match.params.problem_id ? (<Link to={"/students/assignments/"+this.props.match.params.id+"/summary/"}><button onClick={this.submit.bind(this)}> Submit </button> </Link>) : (null)}
																</div>
															</div>
														}
													</div>
													):(null)
												}
										</div>
									 	: 'Assignment problem does not exist'
									 }
								</div>
							}
						</div>
						:(null)

						}
				</div>
		)
	}
}

export default connect((store) => {
    return {
    	username: store.account.username,
    	assignments: store.account.assignments,
    	answer_choice: store.assignment.answer_choice,
    	answer_text: store.assignment.answer_text,
    	saved_answer_choice: store.assignment.saved_answer_choice,
    	saved_answer_text: store.assignment.saved_answer_text,
    	completed: store.assignment.completed,
    	completed_problems_list: store.assignment.completed_problems_list,
    	jwt: store.account.jwt,
    	score: store.assignment.score,
    	assignments_fetched: store.assignment.init_fetched,
    	portal_hide: store.account.portal_hide,
    };
})(Assignment);