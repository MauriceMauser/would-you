import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Home from './Home';
import Login from './Login'
import LoadingBar from 'react-redux-loading';
import NewQuestion from './NewQuestion';
import QuestionPage from './QuestionPage';
import Leaderboard from './Leaderboard';
import Nav from './Nav';

class App extends Component {
  componentDidMount() {
  	this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            {!this.props.authedUser
              ? <Login />
              : <div>
                  <Nav />
                  <Route path="/" exact component={Home} />
                  <Route path="/questions/:id" component={QuestionPage} />
                  <Route path="/add" component={NewQuestion} />
                  <Route path="/leaderboard" component={Leaderboard} />
              </div>
            }
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(App);
