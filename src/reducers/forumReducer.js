export default function reducer(state={
	input: '',
	fetching_thread: false,
	fetched_thread: true,
	reply_input: '',
	topic_updates_unread: [],
	topic_updates_read: [],
	thread_updates_unread: [],
	thread_updates_read: [],
	reply_updates_unread: [],
	reply_updates_read: [],
	topic_dict: {},
	thread_dict: {},
	threads: null,
	replies: null
	}, action) {
	
	switch(action.type){
		case "UPDATE_FORUM_INPUT": {
			return Object.assign({}, state, {input: action.payload})
			break;
		}
		case "CLEAR_FORUM_INPUT": {
			return Object.assign({}, state, {input: ''})
			break;			
		}
		case "UPDATE_FORUM_REPLY_INPUT": {
			return Object.assign({}, state, {reply_input: action.payload})
			break;
		}
		case "CLEAR_FORUM_REPLY_INPUT": {
			return Object.assign({}, state, {reply_input: ''})
			break;			
		}
		case "RECEIVE_FORUMS_UPDATES_INIT": {
			let data = action.payload.data

			let reply_updates_unread = []
			let reply_updates_read = []

			let thread_updates_unread = []
			let thread_updates_read = []
			let thread_dict = {}

			let topic_updates_unread = []
			let topic_updates_read = []
			let topic_dict = {}

			data.map((object) => {
				if (object.received_from_reply != null) {
					if (object.read == false) {
						reply_updates_unread.push({id: object.id, data: object.received_from_reply})
					} else {
						reply_updates_read.push({id: object.id, data: object.received_from_reply})
					}
				} else if (object.received_from_thread != null) {
					if (object.read == false) {
						thread_updates_unread.push(object.received_from_thread)
					} else {
						thread_updates_read.push(object.received_from_thread)
					}
				} else if (object.received_from_topic != null) {
					if (object.read == false) {
						topic_updates_unread.push(object.received_from_topic)
					} else {
						topic_updates_read.push(object.received_from_topic)
					}
				}
			})
			thread_updates_unread.map((object) => {
				thread_dict[object.id] = 'new'
			})
			topic_updates_unread.map((object) => {
				topic_dict[object.id] = 'new'
			})
			return Object.assign({}, state, {
				reply_updates_unread: reply_updates_unread,
				reply_updates_read: reply_updates_read,
				thread_updates_unread: thread_updates_unread,
				thread_updates_read: thread_updates_read,
				topic_updates_unread: topic_updates_unread,
				topic_updates_read: topic_updates_read,
				thread_dict: thread_dict,
				topic_dict: topic_dict,
			})
			break;
		}
		case "RECEIVE_FORUMS_UPDATES": {
			return Object.assign({}, state, {})
			break;
		}
		case "RECEIVE_FORUMS": {
			return Object.assign({}, state, {})
			break;
		}
		case "RECEIVE_FORUMS_INIT": {
			if (action.payload.thread == 0) {
				var threads_list = {}
				threads_list[action.payload.data.id] = action.payload.data.threads
				return Object.assign({}, state, {threads: threads_list, fetched_thread: true})
			}
			else {
				var replies_list = {}
				replies_list[action.payload.data.id] = action.payload.data
				return Object.assign({}, state, {replies: replies_list, fetched_thread: true})
			}
			break;
		}
		case "DROP_FORUMS": {
			return Object.assign({}, state, {
				input: '',
				reply_input: '',
				fetching_thread: false,
				fetched_thread: false,
				})
			break;
		}
	}
	return state;
};