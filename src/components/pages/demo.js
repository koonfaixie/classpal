import React from 'react';
import { Link } from "react-router-dom";
import { push } from 'react-router-redux';
import store from "../../store.js";
import { login } from "../../actions/AccountActions.js";

export default class Demo extends React.Component {
	constructor(props) {
		super(props)
		this.val = [
			{'username': 'demo1', 'password': 'demoaccount'},
			{'username': 'demo2', 'password': 'demoaccount'},
			{'username': 'demo3', 'password': 'demoaccount'},
			{'username': 'demo4', 'password': 'demoaccount'},
			]
	}

	login1(){
		let promise1 = new Promise((resolve,reject) => {login(this.val[0])})
		let promise2 = new Promise((resolve,reject) => {store.dispatch(push('/students/'))})
		promise1.then(()=> { promise2 })
	}

	login2(){
		let promise1 = new Promise((resolve,reject) => {login(this.val[1])})
		let promise2 = new Promise((resolve,reject) => {store.dispatch(push('/students/'))})
		promise1.then(()=> { promise2 })
	}

	login3(){
		let promise1 = new Promise((resolve,reject) => {login(this.val[2])})
		let promise2 = new Promise((resolve,reject) => {store.dispatch(push('/students/'))})
		promise1.then(()=> { promise2 })
	}

	login4(){
		let promise1 = new Promise((resolve,reject) => {login(this.val[3])})
		let promise2 = new Promise((resolve,reject) => {store.dispatch(push('/students/'))})
		promise1.then(()=> { promise2 })
	}

	render() {
		return (
			<div className="demo">
				<p>You may use one of the demo accounts below to check out the student portal:</p>
				<div className="demo-list">
					<div onClick={this.login1.bind(this)}> Demo Account 1 </div>
					<div onClick={this.login2.bind(this)}> Demo Account 2 </div>
					<div onClick={this.login3.bind(this)}> Demo Account 3 </div>
					<div onClick={this.login4.bind(this)}> Demo Account 4 </div>
				</div>
				<p>Or you can register an demo account <Link to="/register">here</Link> by using the Registration code 'demo'</p>
			</div>
		)
	}
}
