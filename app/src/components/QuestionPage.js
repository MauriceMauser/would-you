import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAnswerQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom';


const Option = ({ question, option, handleClick }) => (
  <button 
    onClick={handleClick}
    style={{ marginLeft: 10, marginRight: 10 }}
  >
    {option === 'optionOne' ? question.optionOne.text : question.optionTwo.text}
  </button>
);

const Summary = ({ question, option }) => (
  <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center' }}>
    <h6>{question[option].text}</h6>
    <div><p>{`${question[option].votes.length} votes`}</p></div>
    <div><p>{`${(question[option].votes.length / (question['optionOne'].votes.length + question['optionTwo'].votes.length)).toFixed(2)}%`}</p></div>
  </div>
);

class QuestionPage extends Component {
  state = {
    toHome: false
  }

  handleClick = async (e, question, option) => {
    e.preventDefault();
    await this.props.dispatch(handleAnswerQuestion({ question, answer: option }));
    this.setState({ toHome: true }); 
  }

  render() {
  	const { id, authedUser, questions, users } = this.props;
    const question = questions[id];
    const user = users[authedUser];
    const givenAnswer = user.answers[id];
    return (this.state.toHome ? <Redirect to="/" />
      : (question ?
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30 }}>
              <h3>Would you Rather?</h3>
              <img
                src={user.avatarURL}
                alt={`Avatar of ${user.name}`}
                className="avatar"
              />
              <h4>{givenAnswer ? givenAnswer : ''}</h4>
              <div>
                {!!givenAnswer 
                  ? (<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                      <Summary 
                        question={question} 
                        option="optionOne"
                      />
                      <Summary 
                        question={question} 
                        option="optionTwo"
                      />
                    </div>)
                  : (<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Option 
                          question={question} 
                          option="optionOne"
                          handleClick={e => this.handleClick(e, question, 'optionOne')}
                        />
                        <Option 
                          question={question} 
                          option="optionTwo"
                          handleClick={e => this.handleClick(e, question, 'optionTwo')}
                        />
                      </div>)}
              </div>
            </div> : <div><br /><div>404 - Does not exist.</div></div>)
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;

  return {
  	id,
    authedUser,
    questions,
    users,
    ...props
  };
}

export default connect(mapStateToProps)(QuestionPage);
