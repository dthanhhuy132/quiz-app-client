import resetAddEditQuestionFormAdmin from './resetFormAddEditQuestion';
import setTitleModalAdminPage from './setTilteModalAdminPage';

function renderEditQuestion(question) {
  const questionQuiz = document.querySelector('.question-quiz-text');
  const correctAnswers = document.querySelectorAll('.answer-correct');
  const answersQuiz = document.querySelectorAll('.question-quiz-answer');

  const addUpdateTextBtn = document.querySelector('.answer-add-update-btn');
  addUpdateTextBtn.innerText = 'Update';
  setTitleModalAdminPage('Update question');
  resetAddEditQuestionFormAdmin();

  questionQuiz.value = question.question;
  answersQuiz.forEach((anserEl) => {
    anserEl.value = question.answers[anserEl.id];
  });

  questionQuiz.dataset.id = question.id;

  correctAnswers.forEach((correctAnswerEl) => {
    if (question.correctAnswer.indexOf(correctAnswerEl.value) > -1) {
      correctAnswerEl.checked = true;
    }
  });
}

export default renderEditQuestion;
