import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom';

class NewQuestion extends Component {
  state = {
  	optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }
  handleChangeOne = e => {
  	const optionOneText = e.target.value;
  	this.setState(() => ({
  		optionOneText,
  	}));
  }
  handleChangeTwo = e => {
    const optionTwoText = e.target.value;
    this.setState(() => ({
      optionTwoText,
    }));
  }
  handleSubmit = e => {
  	e.preventDefault();

  	const { optionOneText, optionTwoText } = this.state;
    const { dispatch, authedUser } = this.props;

    dispatch(handleAddQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    }));

  	this.setState(() => ({
  		optionOneText: '',
      optionTwoText: '',
      toHome: !authedUser ? false : true,
  	}));
  }

  render() {
  	const { optionOneText, optionTwoText, toHome } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30 }}>
      	<h3 className='center'>Would you Rather?</h3>
        <h6 className='center' style={{ color: 'lightgray'}}>Pose a new Question</h6>
        <form className='new-poll' onSubmit={this.handleSubmit}>
        	<div className="form-row">
            <div className="form-label">Option One: </div>
            <input 
              placeholder="Option One"
              value={optionOneText}
              onChange={this.handleChangeOne}
              className="form-input"
            />
          </div>
          <div className="form-row">
            <div className="form-label">Option Two: </div>
            <input 
              placeholder="Option Two"
              value={optionTwoText}
              onChange={this.handleChangeTwo}
              className="form-input"
            />
          </div>

        	<button
        		className='btn'
        		type='submit'
        		disabled={optionOneText === '' || optionTwoText === '' || !this.props.authedUser}
        	>
        		Submit
        	</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NewQuestion);
