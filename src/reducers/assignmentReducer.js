export default function reducer(state={
	answer_choice: '',
	answer_text: '',
	saved_answer_choice: '',
	saved_answer_text: '',
	completed: false,
	completed_problems_list: {},
	init_problem_id: 1,
	init_fetched: false,
	score: 'Not yet graded',
	progress_fetching: false,
	progress_fetched: false,
	assignments_progress: {},
	}, action) {
	
	switch(action.type){
		case "UPDATE_ASSIGNMENT_ANSWER_CHOICE": {
			return Object.assign({}, state, {answer_choice: action.payload})
			break;
		}
		case "UPDATE_ASSIGNMENT_ANSWER_TEXT": {
			return Object.assign({}, state, {answer_text: action.payload})
			break;
		}
		case "UPDATE_ASSIGNMENT_ANSWERS": {
			var saved_answer = state.completed_problems_list[action.problem]
			var saved_answer_choice = ''
			var saved_answer_text = ''	
			if (saved_answer) {		
				if (saved_answer.choice) {
					saved_answer_choice = saved_answer.choice.name
				}
				if (saved_answer.text) {
					saved_answer_text = saved_answer.text
				}
			}
			return Object.assign({}, state, {saved_answer_choice: saved_answer_choice, saved_answer_text: saved_answer_text})
			break;
		}
		case "RECEIVE_ASSIGNMENTS": {
			var assignment = action.payload.answer
			var assignment_problem_choice = ""
			if (assignment.assignment_problem_choice){
				assignment_problem_choice = assignment.assignment_problem_choice.name
			}
			var assignment_problem_text = ""
			if (assignment.assignment_problem_text){
				assignment_problem_text = assignment.assignment_problem_text
			}
			return Object.assign({}, state, {answer_choice: assignment_problem_choice, answer_text: assignment_problem_text})
			break;
		}
		case "ASSIGNMENTS_INIT": {
			return Object.assign({}, state, {init_problem_id: action.problem_id})			
			break;
		}
		case "RECEIVE_ASSIGNMENTS_INIT": {
			let completed_problems_list = {}
			let completed_problems = action.payload.data.answers
			completed_problems.map((problem) =>
				completed_problems_list[problem.assignment_problem.number] = {choice: problem.assignment_problem_choice, text: problem.assignment_problem_text, correct: problem.correct, multiple_choice: problem.assignment_problem.multiple_choice}
				)
			let answer_choice = ''
			let answer_text = ''
			if (completed_problems_list[state.init_problem_id]){
				if (completed_problems_list[state.init_problem_id]['choice']){
					answer_choice = String(completed_problems_list[state.init_problem_id]['choice'].name)
				}
				answer_text = completed_problems_list[state.init_problem_id]['text']
			}
			return Object.assign({}, state, {init_fetched: true, completed: action.payload.data.completed ,completed_problems_list: completed_problems_list, answer_choice: answer_choice, answer_text: answer_text, saved_answer_choice: answer_choice, saved_answer_text: answer_text})
			break;
		}
		case "RECEIVE_ASSIGNMENTS_COMPLETED": {
			let completed_problems_list = {}
			let score = action.payload.data.score
			let completed_problems = action.payload.data.answers
			completed_problems.map((problem) =>
				completed_problems_list[problem.assignment_problem.number] = {choice: problem.assignment_problem_choice, text: problem.assignment_problem_text}
				)
			return Object.assign({}, state, {completed: action.payload.data.completed ,completed_problems_list: completed_problems_list, score: score})
			break;
		}
		case "CLEAR_ASSIGNMENT_ANSWERS": {
			return Object.assign({}, state, {answer_choice: '', answer_text: ''})
			break;			
		}
		case "DROP_ASSIGNMENTS": {
			return Object.assign({}, {
				answer_choice: '',
				answer_text: '',
				saved_answer_choice: '',
				saved_answer_text: '',
				completed: false,
				completed_problems_list: {},
				init_problem_id: 1,
				score: 'Not yet graded'
				})
			break;
		}
		case "OBTAIN_ASSIGNMENT_PROGRESS_PENDING": {
			return Object.assign({}, state, {progress_fetching: true})
			break;			
		}
		case "OBTAIN_ASSIGNMENT_PROGRESS_REJECTED": {
			return Object.assign({}, state, {progress_fetching: false})
			break;			
		}
		case "OBTAIN_ASSIGNMENT_PROGRESS_FULFILLED": {
			let list_of_assignments = action.payload.data
			let new_assignments_progress = {}
			list_of_assignments.map((assignment) =>
				new_assignments_progress[assignment.assignment.id] = {'percent':(assignment.answers.length/assignment.assignment.problems.length)*100, 'completed': assignment.completed}
				)
			return Object.assign({}, state, {progress_fetched: true, progress_fetching: false, assignments_progress: new_assignments_progress})
			break;			
		}
	}
	return state;
};