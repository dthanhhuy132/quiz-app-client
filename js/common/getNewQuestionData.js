import { checkEnoughQuestionAnswer } from './utils';

export default function getNewQuestionData() {
  const questionQuiz = document.querySelector('.question-quiz-text');
  const correctAnswers = document.querySelectorAll('.answer-correct:checked');
  const answersQuiz = document.querySelectorAll('.question-quiz-answer');
  // basic validate data end

  const correctAnswerArr = [];
  const answersArr = {};

  correctAnswers.forEach((item) => {
    correctAnswerArr.push(item.value);
  });

  answersQuiz.forEach((item) => {
    answersArr[item.id] = item.value;
  });

  let multiAnswer = correctAnswerArr.length > 1 ? true : false;

  let correctAnswerSet = correctAnswerArr.length > 1 ? correctAnswerArr : correctAnswerArr.join('');

  const isEnoughAnswer = checkEnoughQuestionAnswer(answersArr);
  if (correctAnswers.length == 0 || questionQuiz.value.trim().length == 0 || !isEnoughAnswer) {
    window.alert('Please enter all field');
    return false;
  }

  let questionData = {
    question: questionQuiz.value,
    answers: answersArr,
    correctAnswer: correctAnswerSet,
    multi: multiAnswer,
  };

  return questionData;
}
