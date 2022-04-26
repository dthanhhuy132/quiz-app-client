import feedbackApi from './api/feedbackApi';
import questionApi from './api/questionApi';
import getQuestionData from './common/getQuestionData';
import renderQuestionInAdminPage from './common/renderQuestionInAdminPage';
import resetAddEditQuestionFormAdmin from './common/resetFormAddEditQuestion';
import setTitleModalAdminPage from './common/setTilteModalAdminPage';
import updateEditQuestion from './common/updateEditQuestion';
import { checkEnoughQuestionAnswer } from './common/utils';
import renderFeedback from './renderFeedbackforAdminPage';

const questionList = document.querySelector('.question-list');
const adQuestionBtn = document.querySelector('.quiz-add i');

let adminModal = new bootstrap.Modal(document.getElementById('adminModal'));
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
    // const answerCorrect =
    //   question.correctAnswer.length > 1 ? question.correctAnswer.join('') : question.correctAnswer;
    renderQuestionInAdminPage(question, questionList, adminModal);
  });
}

// ################################### Add modal for admin page

adQuestionBtn.addEventListener('click', () => {
  setTitleModalAdminPage('Add new question');
  adminModal.show();
  const questionQuiz = document.querySelector('.question-quiz-text');
  delete questionQuiz.dataset.id;

  const addUpdateTextBtn = document.querySelector('.answer-add-update-btn');
  addUpdateTextBtn.innerText = 'Create';
});

addEditBtn.addEventListener('click', async () => {
  let { questionData, questionId } = getQuestionData();
  addEditBtn.disabled = true;

  if (questionData) {
    if (!questionId) {
      await questionApi.addNewQuestion(questionData).then((res) => {
        if (res.status < 300) {
          renderQuestionInAdminPage(res.data, questionList);
        }
      });
      adminModal.hide();
      resetAddEditQuestionFormAdmin();
    } else {
      await questionApi.editQuestion(questionId, questionData).then((res) => {
        if (res.status < 300) {
          updateEditQuestion(res.data, res.data.id);
          // window.location.reload();
        } else {
          window.alert('Something wrong!!!');
        }
      });

      adminModal.hide();
      resetAddEditQuestionFormAdmin();
    }
  }

  setTimeout(() => {
    addEditBtn.disabled = false;
  }, 2000);
});

// ################################## Delete question
