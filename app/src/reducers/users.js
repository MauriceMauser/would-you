import { RECEIVE_USERS } from '../actions/users';
import { ADD_QUESTION, ANSWER_QUESTION } from '../actions/questions';

export default function users(state = {}, action) {
  switch(action.type) {

	  case RECEIVE_USERS:
	    return {
	      ...state,
	      ...action.users,
	    };

	   case ADD_QUESTION:
	     return {
	     	...state,
	     	[action.question.author]: {
	     		...state[action.question.author],
	     		questions: state[action.question.author].questions.concat([action.question])
	     	}
	     }

	   case ANSWER_QUESTION:
	     return {
	     	...state,
	     	[action.authedUser]: {
	     		...state[action.authedUser],
	     		answers: {
	     			...state[action.authedUser].answers,
	     			[action.question.id]: action.answer
	     		}
	     	}
	     }

	  default:
	  	return state;
	  }
}
