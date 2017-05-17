import React from 'react';

import { history } from './history'
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux'

import Root from "./components/page-layout/root";
import Home from "./components/pages/home";
import Register from "./components/pages/register";
import StudentPortal from "./components/pages/studentportal";
import PasswordReset from "./components/pages/passwordreset";
import Demo from "./components/pages/demo";

export class Routes extends React.Component {
	render() {
		console.log(typeof(Route),typeof(ConnectedRouter),typeof(history),typeof(Root),typeof(Home),typeof(Register),typeof(StudentPortal),typeof(PasswordReset),typeof(Demo))
		return (
			<ConnectedRouter history={history}>
				<Root>
					<Route exact path="/" component={Home}/>
					<Route path="/register" component={Register}/>
					<Route path="/passwordreset" component={PasswordReset}/>
					<Route path="/students" component={StudentPortal}/>
					<Route path="/demo" component={Demo}/>
				</Root>
			</ConnectedRouter>
			)
	}
}