import React, { Component } from 'react';
import { connect } from 'react-redux';

const Entry = ({ user }) => (
  <div>
    <div>
      <img
        src={user.avatarURL}
        alt={`Avatar of ${user.name}`}
        className="avatar"
      />
    </div>
    <div>
      <h5>{user.name}</h5>
      <div>{`Questions asked: ${user.questions.length}`}</div>
      <div>{`Questions answered: ${Object.keys(user.answers).length}`}</div>
      <br />
    </div>
  </div>
)

class Leaderboard extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>Leaderboard</h3>
        <ul className='leaderboard-list'>
          {this.props.users.map(user => (
            <li key={user.id}>
              <Entry user={user} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const totalCount = uid => (users[uid].questions.length + Object.keys(users[uid].answers).length);
  return {
    users: Object.keys(users)
    	.sort((a, b) => totalCount(b) - totalCount(a))
      .map(uid => users[uid]),
  };
}

export default connect(mapStateToProps)(Leaderboard);
