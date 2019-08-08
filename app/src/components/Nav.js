import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authedUser';


const Nav = ({ users, authedUser, dispatch }) => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <Link to="/" className="nav-link">
      Home
    </Link>
    <Link to="/add" className="nav-link">
      New Poll
    </Link>
    <Link to="/leaderboard" className="nav-link">
      Leaderboard
    </Link>
    {authedUser ? (
      <div className="nav-link">
        <span style={{ marginRight: 10, fontSize: 12 }}>* {users[authedUser].name} *</span>
        <button onClick={() => dispatch(logoutUser())}>
          Logout
        </button>
      </div>) : ''}
  </div>
);

function mapStateToProps({ authedUser, users }) { 
  return { 
    authedUser,
    users 
  }
}

export default connect(mapStateToProps)(Nav);
