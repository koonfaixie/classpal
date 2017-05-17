import React from 'react';
import { Link } from "react-router-dom";

export default class Home extends React.Component {
	
	render() {
		return (
			<div className="home">
				<div className="home-student-portal"><Link to="/students">Student Login Portal</Link></div>
				<div className="home-flag"> </div>
			</div>
		)
	}
}
