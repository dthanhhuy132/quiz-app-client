import feedbackApi from './api/feedbackApi';
import questionApi from './api/questionApi';
import getNewQuestionData from './common/getNewQuestionData';
import renderQuestionInAdminPage from './common/renderQuestionInAdminPage';
import resetAddEditQuestionFormAdmin from './common/resetFormAddEditQuestion';
import setTitleModalAdminPage from './common/setTilteModalAdminPage';
import { checkEnoughQuestionAnswer } from './common/utils';
import renderFeedback from './renderFeedbackforAdminPage';

const questionList = document.querySelector('.question-list');
const adQuestionBtn = document.querySelector('.quiz-add i');

let adminModal = new bootstrap.Modal(document.getElementById('adminModal'));
let deleteConfirmModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
const addEditBtn = document.querySelector('.answer-add-update-btn');

let myQuestions;

let adminPageInitLoad = async () => {
  try {
    const questions = await questionApi.getAllQuestions();
    const feedback = await feedbackApi.getAllFeedback();
    myQuestions = questions.data;
    const feedbackData = feedback.data;

    if (questions && feedback) {
      renderQuestion();
      renderFeedback(feedbackData);
    } else {
    }
  } catch (err) {}
};

adminPageInitLoad();

// ################################### Render question for admin page
function renderQuestion() {
  myQuestions.forEach((question, index) => {
    const answerCorrect =
      question.correctAnswer.length > 1 ? question.correctAnswer.join('') : question.correctAnswer;
    renderQuestionInAdminPage(question, questionList);
    // Click btn to get question Data
  });
}

// ################################### Add modal for admin page

adQuestionBtn.addEventListener('click', () => {
  setTitleModalAdminPage('Add new question');
  adminModal.show();
});

addEditBtn.addEventListener('click', async () => {
  let questionData = getNewQuestionData();

  if (questionData) {
    await questionApi.addNewQuestion(questionData).then((res) => {
      if (res.status < 300) {
        renderQuestionInAdminPage(res.data, questionList);
      }
    });
    adminModal.hide();
    resetAddEditQuestionFormAdmin();
  }
});

// ################################## Delete question
