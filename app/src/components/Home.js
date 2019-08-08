import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {

	state = {
		showAnsweredPolls: false,
	}

	render() {
		const { questions, user } = this.props;
		const { showAnsweredPolls } = this.state;
		const { answers } = user;

		const filter = q => showAnsweredPolls ? !!answers[q.id] : !answers[q.id];

		return (
			<div>
			  <br />
			  <div style={{ display: 'flex', flexDirection: 'row' }}>
				<button
					onClick={() => this.setState({ showAnsweredPolls: false })}
					style={{ flex: 1 }}
				>
					Unanswered Polls
				</button>
				<button
					onClick={() => this.setState({ showAnsweredPolls: true })}
					style={{ flex: 1 }}
				>
					Answered Polls
				</button>
			  </div>
			  <br />

			  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<h6 style={{ color: 'lightgray' }}>{showAnsweredPolls ? "Answered Polls" : "Unanswered Polls"}</h6>
			  	<h3>Would you Rather?</h3>
			  	<li>
					{questions.filter(filter).map(question => (
						<ul key={question.id} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}> 
							<Link to={`/questions/${question.id}`} style={{ color: '#4285F4'}}>
								{`${question.optionOne.text}  < or >  ${question.optionTwo.text}`}
							</Link>
						</ul>
					))}
			  	</li>
			  </div>
			</div>
		)
	}
}


function mapStateToProps({ questions, users, authedUser }) {
	return {
		questions: Object.keys(questions)
				.sort((a,b) => questions[b].timestamp - questions[a].timestamp)
				.map(qid => questions[qid]),
		user: users[authedUser]
	}
}

export default connect(mapStateToProps)(Home)
