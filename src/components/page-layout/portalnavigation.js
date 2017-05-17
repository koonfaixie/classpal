import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Chat from '../pages/chat.js';
import UpdateSocket from '../pages/updatesocket.js';
import Modal from 'react-modal';
import Peer from '../pages/peer.js';
import Messages from '../pages/messages.js';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class PortalNavigation extends React.Component {
	constructor(props, context) {
		super(props, context)
        this.state = {
            modalChat: false,
            newModalChat: false,
            modal_title: '',
            new_chat_label: '',
            new_chat_name: '',
            new_chat_selected_list: [],
            chatroom_add_error: false,
        }
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
	}

    openChat(chat_label, chat_name){
        this.setState({modalChat: true})
        this.props.dispatch({type:'CONNECT', url: '/chat/'+chat_label+'/', connect_type: 'chat', label: chat_label, token: this.props.jwt})
        this.props.dispatch({type:'FOCUS_CHAT', label: chat_label})
        this.openModal(chat_name)
    }

    updateInput(e){
        this.props.dispatch({type: 'UPDATE_CHAT_INPUT', payload: e.currentTarget.value})
    }

    updateNewChatInput(e){
        this.props.dispatch({type: 'UPDATE_NEW_CHAT_INPUT', payload: e.currentTarget.value})
    }

    checkKey(e){
        if(e.keyCode==13 || e.which==13){
            e.preventDefault()
            this.sendMessage()
        }
    }

    sendMessage(){
        this.props.dispatch({type: 'SEND_MESSAGE', label: this.props.focus, message: {'message': this.props.chat_input}, token: this.props.jwt})
        this.props.dispatch({type: 'UPDATE_CHAT_INPUT', payload: ''})
    }

    startChatRoom(){
        if (this.state.new_chat_selected_list.length > 0) {
            this.closeModalNewChat()
            this.setState({ chatroom_add_error: false })
            this.openChat(this.state.new_chat_label, this.state.new_chat_name)
        } else {
            this.setState({ chatroom_add_error: true })
        }
    }

    selectUser(obj){
        let new_list = this.state.new_chat_selected_list
        let new_label = [this.props.user_id]
        let new_name = this.props.first_name+' '+(this.props.last_name.slice(0,1))
        new_list = new_list.concat(obj)
        new_list.map((object) => {
            new_label.push(object.id)
            new_name += ', '+object.first_name+' '+object.last_name.slice(0,1)
            })
        new_label.sort()
        let new_label_string = '';
        new_label.map((id) =>{
            new_label_string += id+'.'
        })
        this.setState({
            new_chat_label: new_label_string.slice(0,-1),
            new_chat_name: new_name,
            new_chat_selected_list: new_list,
        })
    }

    deselectUser(obj){
        let new_list = this.state.new_chat_selected_list
        let new_label = [this.props.user_id]
        let new_name = this.props.first_name+' '+this.props.last_name.slice(0,1)
        let index = new_list.findIndex(x => x.name==obj.name);
        new_list.splice(index, 1)
        new_list.map((object) => {
            new_label.push(object.id)
            new_name += ', '+object.first_name+' '+object.last_name.slice(0,1)
            })
        new_label.sort()
        this.setState({
            new_chat_label: new_label,
            new_chat_name: new_name,
            new_chat_selected_list: new_list,
        })
    }

    openModalNewChat(){
        this.setState({newModalChat: true})
        this.props.dispatch({type:'FOCUS_CHAT', label: ''})
    }

    afterOpenModalNewChat(){
        // references are now sync'd and can be accessed.
        // this.scrollToBottom()
    }

    closeModalNewChat(){
        // this.setState({modalIsOpenNewChat: false, new_chat_label: '', new_chat_name: '', new_chat_selected_list: []})
        this.props.dispatch({type:'CLOSE_CHAT'})
        this.setState({newModalChat: false, new_chat_label: '', new_chat_name: '', new_chat_selected_list: []})
   
    }


    openModal(chat_name){
        if (this.state.modal_title !== chat_name) {
            this.props.dispatch({type: 'UPDATE_CHAT_INPUT', payload: ''})
        }
        this.setState({modalChat: true, modal_title: chat_name})
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.scrollToBottom()
    }

    closeModal(){
        // this.setState({modalIsOpen: false})
        this.props.dispatch({type:'CLOSE_CHAT'})
        this.setState({modalChat: false})
    }

    togglePortal(){
        this.props.dispatch({type: 'TOGGLE_PORTAL'})
    }

	render() {
		return (
            <div>
                {this.props.username ? (
                    <div>
                        <div className={this.props.portal_hide ? "portal-nav-hide" : "portal-nav"}>

                            <UpdateSocket/>

                            <div className="portal-nav-toggle"><span className="portal-nav-toggle-button" onClick={this.togglePortal.bind(this)}> <i className="fa fa-arrow-left" aria-hidden="true"></i> </span></div>

                        	<div className="portal-nav-announcements"> 
                        		<p className="portal-nav-option"><Link to="/students">Announcements</Link></p>

                        	</div>

                        	<div className="portal-nav-assignments"> 
                        		<p className="portal-nav-option"><Link to="/students/assignments">Assignments</Link></p>

                        	</div>

                        	<div className="portal-nav-practices"> 
                        		<p className="portal-nav-option"><Link to="/students/practices">Practice</Link></p>
                        	
                        	</div>

                        	<div className="portal-nav-forums"> 
                        		<p className="portal-nav-option"><Link to="/students/forums">Forums</Link></p>

                        	</div>

                        	<div className="portal-nav-settings"> 
                        		<p className="portal-nav-option"><Link to="/students/settings">Settings</Link></p>

                        	</div>


                            <div className="portal-nav-chat"> 
                                <p className="portal-nav-option">My Chats <span className="cursorPointer" onClick={this.openModalNewChat.bind(this)}> <i className="fa fa-plus" aria-hidden="true"></i> </span> </p>
                                {this.props.updates_fetching ? 
                                    <div> fetching ... </div>
                                    :
                                    <div>
                                        {this.props.mychats.map((chat, index) =>
                                            <Chat key={index} chat={chat} openChat={this.openChat.bind(this)}/>
                                        )}
                                    </div>
                                }
                            </div>


                            <Modal
                                isOpen={this.props.modalIsOpen && this.state.modalChat}
                                onAfterOpen={this.afterOpenModal}
                                onRequestClose={this.closeModal}
                                style={customStyles}
                                contentLabel="Chat Modal"
                            >
                            <span className="modal-close" onClick={this.closeModal}><i className="fa fa-times" aria-hidden="true"></i></span>
                            <div className="modal-title">{this.state.modal_title}</div>
                            <div className="modal-chat">
                                <table className="modal-chat-messages">
                                    <tbody>
                                        <tr>
                                            <Messages messages={this.props.messages[this.props.focus]} newMessage={this.props.newMessage} dispatch={this.props.dispatch.bind(this)}/>
                                        </tr>
                                    </tbody>
                                </table>
                               <div className="modal-chat-input">
                                    <input type="text" onKeyDown={this.checkKey.bind(this)} onChange={this.updateInput.bind(this)} value={this.props.chat_input}/> <button type="submit" onClick={this.sendMessage.bind(this)}>send</button>
                               </div>
                            </div>
                            </Modal>

                            <Modal
                                isOpen={this.props.modalIsOpen && this.state.newModalChat}
                                onAfterOpen={this.afterOpenModalNewChat.bind(this)}
                                onRequestClose={this.closeModalNewChat.bind(this)}
                                style={customStyles}
                                contentLabel="New Chat Modal"
                            >
                            <span className="modal-close" onClick={this.closeModal}><i className="fa fa-times" aria-hidden="true"></i></span>
                            <div className="modal-new-title">Choose the users you want to chat with:</div>
                            <div className="modal-new-chat">
                                <div className="modal-new-selected-users"> Selected users: <div> {this.state.new_chat_name} </div> </div>
                                <div className="modal-new-select-users">
                                    {this.props.peers.map((peer, index) =>
                                        <Peer key={index} peer={peer} select={this.selectUser.bind(this)} deselect={this.deselectUser.bind(this)} username={this.props.username}/>
                                        )}
                                </div>
                                <div className="modal-new-chat-input">
                                    <button type="submit" onClick={this.startChatRoom.bind(this)}>start chat room</button>
                                    {this.state.chatroom_add_error ? <div className="modal-caution"> You have to add atleast one other person to start chat room! </div> : (null)}
                                </div>
                            </div>
                            </Modal>
                        </div>
                        <div className={this.props.portal_hide ? "portal-nav-menu" : "portal-nav-hide"}>
                            <span className="portal-nav-menu-icon" onClick={this.togglePortal.bind(this)}> <i className="fa fa-bars" aria-hidden="true"></i> </span>
                        </div>
                    </div>
                ): (null)}
            </div>
		)
	}
}

export default connect((store) => {
    return {
        username: store.account.username,
    	user_id: store.account.user_id,
        first_name: store.account.first_name,
        last_name: store.account.last_name,
    	mychats: store.chat.chats,
        messages: store.chat.messages,
        focus: store.chat.focus,
        jwt: store.account.jwt,
        chat_input: store.chat.chat_input,
        new_chat_input: store.chat.new_chat_input,
        peers: store.account.peers,
        updates_fetching: store.chat.update_fetching,
        modalIsOpen: store.chat.modalOpen,
        newMessage: store.chat.newMessage,
        portal_hide: store.account.portal_hide,
    };
})(PortalNavigation);