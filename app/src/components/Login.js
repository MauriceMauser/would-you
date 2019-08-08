import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
	state = {
		selectedUser: '',
	}

	handleLogin = async (e) => {
		e.preventDefault();
		return this.props.dispatch(setAuthedUser(this.state.selectedUser));
	}

	handleChange = e => this.setState({ selectedUser: e.target.value })

	render () {
		const { authedUser, users } = this.props;

		return (authedUser ?
			<Redirect to="/" /> :
			(<div>
				<br />
				<div>Please select a user to login.</div>
				<br />
				<form onSubmit={this.handleLogin}>
					<select onChange={this.handleChange} value={this.state.selectedUser}>
						<option disabled value='' key="none"> -- select a user -- </option>
						{Object.keys(users).map(uid => (<option key={uid} value={uid}>{users[uid].name}</option>))}
					</select>
					<br />
					<br />
					<input type="submit" value="Login" />
				</form>
			</div>)
		)
	}
}

function mapStateToProps({ users, authedUser }) {
	return {
		users,
		authedUser
	}
}

export default connect(mapStateToProps)(Login);
