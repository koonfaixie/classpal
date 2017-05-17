export default function reducer(state={
	messages: {},
	chats: [],
	focus: '',
	chat_input: '',
	new_chat_input: '',
	update_fetching: false,
	update_fetched: false,
	modalOpen: false,
	newMessage: false,
	}, action) {
	
	switch(action.type){
		case "RECEIVE_MESSAGES": {
			let label = action.payload.label;
			let new_messages = Object.assign({}, state.messages)
			let old_obj_messages = new_messages[label]
			if (label == state.focus){
				if (old_obj_messages == undefined) {
					if (Array.isArray(action.payload.data)){
						new_messages[label] = action.payload.data
					} else {
						new_messages[label] = [action.payload.data]
					}
					return Object.assign({}, state, {messages: new_messages, modalOpen: true, newMessage: false})
				} else if (old_obj_messages.length == 0) {
					if (Array.isArray(action.payload.data)){
						new_messages[label] = action.payload.data
					} else {
						new_messages[label] = [action.payload.data]
					}
					return Object.assign({}, state, {messages: new_messages, modalOpen: true, newMessage: false})
				}
				else {
					new_messages[label] = old_obj_messages.concat(action.payload.data)
					return Object.assign({}, state, {messages: new_messages, modalOpen: true, newMessage: true})
				}				
			} else {
				if (old_obj_messages == undefined) {
					new_messages[label] = action.payload.data
					return Object.assign({}, state, {messages: new_messages})
				} else if (old_obj_messages.length == 0) {
					new_messages[label] = action.payload.data
					return Object.assign({}, state, {messages: new_messages})
				}
				else {
					new_messages[label] = old_obj_messages.concat(action.payload.data)
					return Object.assign({}, state, {messages: new_messages})
				}
			}
			break;
		}
		case "RECEIVING_UPDATES": {
			return Object.assign({}, state, {update_fetching: true, update_fetched: false})
		}
		case "RECEIVE_UPDATES": {
			let label = action.payload.label;
			if (label == 'init'){
				return Object.assign({}, state, {chats: action.payload.data, update_fetching: false, update_fetched: true})
			} else {
				let new_chats = state.chats
				let index = new_chats.findIndex(x => x.receivedfrom.label==action.payload.label);
				new_chats.splice(index, 1)
				new_chats.splice(0, 0, action.payload.data)
				return Object.assign({}, state, {chats: new_chats, update_fetching: false, update_fetched: true})
			}
			break;
		}
		case "FOCUS_CHAT": {
			if (action.label) {
				let new_messages = Object.assign({}, state.messages)
				let old_obj_messages = new_messages[action.label]
				if (old_obj_messages == undefined) {
					return Object.assign({}, state, {focus: action.label, modalOpen: false})
				} else if (old_obj_messages.length == 0) {
					return Object.assign({}, state, {focus: action.label, modalOpen: false})
				}
				else {
					return Object.assign({}, state, {focus: action.label, modalOpen: true})
				}
			} else {
				return Object.assign({}, state, {modalOpen: true})
			}
			break;
		}
		case "CLOSE_CHAT": {
			return Object.assign({}, state, {modalOpen: false})
			break;
		}
		case "SCROLLED_BOTTOM": {
			return Object.assign({}, state, {newMessage: false})
			break;
		}
		case "DROP_MESSAGES": {
			let label = action.label;
			let new_messages = state.messages
			new_messages[label] = []
			return Object.assign({}, state, {messages: new_messages})
			break;			
		}
		case "UPDATE_CHAT_INPUT": {
			return Object.assign({}, state, {chat_input: action.payload})
			break;
		}
		case "UPDATE_NEW_CHAT_INPUT": {
			return Object.assign({}, state, {new_chat_input: action.payload})
			break;
		}
	}
	return state;
};