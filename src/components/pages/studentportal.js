import React from 'react';
import { connect } from 'react-redux';
import Login from './login.js';
import { Route } from "react-router-dom";
import PortalNavigation from '../page-layout/portalnavigation.js'
import Announcements from "./announcements.js";
import Assignments from "./assignments.js";
import Assignment from "./assignment.js";
import Practices from "./practices.js";
import Practice from "./practice.js";
import Forums from "./forums.js";
import Settings from "./settings.js";


class StudentPortal extends React.Component {

	render() {
		return (
			<div> 
			{this.props.initial_check ? (
				<div>
					{this.props.username ? (
						<div className="student-portal">
							<PortalNavigation/>

							<Route exact path="/students" component={Announcements}/>
							<Route exact path="/students/assignments" component={Assignments}/>
							<Route path="/students/assignments/:id/:problem_id" component={Assignment}/>
							<Route exact path="/students/practices" component={Practices}/>
							<Route path="/students/practices/:id/:problem_id" component={Practice}/>
							<Route path="/students/forums" component={Forums}/>
							<Route path="/students/settings" component={Settings}/>
			            </div>
			            ): (
			            	<Login/>
						)}
				</div>
				)
				:
				(null)
			}
			</div>
		)
	}
}

export default connect((store) => {
    return {
        username: store.account.username,
        initial_check: store.account.initial_check,
    };
})(StudentPortal);
