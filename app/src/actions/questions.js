import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

function answerQuestion(question, answer, authedUser) {
  return {
    type: ANSWER_QUESTION,
    question,
    answer,
    authedUser
  }
}

export function handleAddQuestion(question) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    return saveQuestion({
      author: authedUser,
      optionOneText: question.optionOneText,
      optionTwoText: question.optionTwoText,
    })
      .then(question => {
        dispatch(addQuestion(question));
      })
      .then(() => dispatch(hideLoading()))

  }
}

export function handleAnswerQuestion(info) {
  const { question, answer } = info;
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    return saveQuestionAnswer({
      authedUser,
      qid: question.id,
      answer
    })
      .then(() => {
        dispatch(answerQuestion(question, answer, authedUser));
      })
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions(questions) {
  return {
    type: 'RECEIVE_QUESTIONS',
    questions,
  };
}
