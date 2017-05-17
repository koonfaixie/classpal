import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/AccountActions.js';
import axios from 'axios';

class Settings extends React.Component {

    logout(){
        logout()
    }

    passwordReset(){
        this.props.dispatch({type: "RESET_PASSWORD", payload: axios.post("/password_reset/", {email: this.props.email}) })
    }

	render() {
		return (
			<div className={this.props.portal_hide ? "settings-full" : "settings"}>
                <div>
                    <p className="page-title"> Account Settings </p>
                    {this.props.groups[0] ?
                        <div className="settings-options">
                            <div className="settings-option"> Full name: {this.props.first_name+' '+this.props.last_name} </div>
                            { this.props.groups[0].name == 'demo' ?
                                    <div>
                                        <div className="settings-option"> Demo accounts are restricted from changing account settings </div>
                                        <div className="settings-option"> <a className="cursorPointer" onClick={this.logout.bind(this)} >Log out</a> </div>
                                    </div>
                                :
                                (
                                    <div>
                                        <div className="settings-option"> Email: {this.props.email} </div>
                                        <div className="settings-option"> <a className="cursorPointer" onClick={this.passwordReset.bind(this)}>Change Password</a> {this.props.fetching ? <i className="fa fa-spinner fa-pulse fa-1g fa-fw"></i> : (null)} {this.props.fetched ? <div className="success"> A password reset link has been sent to your email. </div> : (null)}</div>
                                        <div className="settings-option"> <a className="cursorPointer" onClick={this.logout.bind(this)} >Log out</a> </div>
                                    </div>
                                )
                            }
                        </div>
                        :
                        (null)
                    }
                </div>
			</div>
		)
	}
}

export default connect((store) => {
    return {
        groups: store.account.groups,
        portal_hide: store.account.portal_hide,
        first_name: store.account.first_name,
        last_name: store.account.last_name,
        email: store.account.email,
        fetching: store.account.fetching_password_reset,
        fetched: store.account.fetched_password_reset,
    };
})(Settings);