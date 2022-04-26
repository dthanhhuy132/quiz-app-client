import questionApi from './api/questionApi';
import pageLoading from './common/loadingPage';

import {
  questionNumberEl,
  questionEl,
  answerEls,
  multiAnswerEl,
  a_textEl,
  b_textEl,
  c_textEl,
  d_textEl,
  preBtnEl,
  nextBtnEl,
  submitBtnEl,
  passEl,
  failEl,
  scoreEl,
  currQuestionEl,
  reviewCorrectEl,
  reviewIncorrectEl,
  tryAgianBtn,
  modalScoreEL,
  modalPassEL,
  modalFailEL,
  feedbackBtn,
  saveMyMarkEl,
} from './common/selector.js';
import createFeedback from './createFeedback';
import renderTableMark from './markTable';
import saveScore from './saveScore';

let currentQuiz = 0;
let totalScore = 0;
const answerArr = {};
let isSubmited = false;
const CORRECT_ANSWER_ARR = 'CORRECT_ANSWER_ARR';
let myQuestions;

pageLoading.show();
(async () => {
  try {
    const questions = await questionApi.getAllQuestions();
    myQuestions = questions.data;

    if (questions) {
      pageLoading.hide();
      renderQuiz();
      renderTableMark();
    } else {
      console.log('cho ti nua moi ra');
    }
  } catch (err) {
    console.log('loi khi get question');
  }
})();

function renderQuiz() {
  const currentQuizData = myQuestions[currentQuiz];

  if (currentQuizData.multi) {
    answerEls.forEach((answerEl) => (answerEl.type = 'checkbox'));
    multiAnswerEl.style.display = 'block';
  } else {
    answerEls.forEach((answerEl) => (answerEl.type = 'radio'));
    multiAnswerEl.style.display = 'none';
  }

  questionNumberEl.innerText = `Question ${currentQuiz + 1}: `;
  questionEl.innerText = currentQuizData.question;
  a_textEl.innerText = currentQuizData.answers.a;
  b_textEl.innerText = currentQuizData.answers.b;
  c_textEl.innerText = currentQuizData.answers.c;
  d_textEl.innerText = currentQuizData.answers.d;

  currQuestionEl.innerHTML = `${currentQuiz + 1} / ${myQuestions.length}`;

  deselecAnswer();
  checkBtn(currentQuiz);
  renderReviewAnswer(currentQuiz);
  if (isSubmited) checkAnswerAfterSummit();
}

function deselecAnswer() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

function getAnswer() {
  let answerTemp = [];

  answerEls.forEach((answerEl) => {
    if (answerEl.checked) answerTemp.push(answerEl.id);
  });

  return answerTemp;
}

function addAnswer() {
  const currentAnswer = getAnswer();
  answerArr[currentQuiz] = currentAnswer;
}

function renderReviewAnswer(currentQuiz) {
  const reviewAnswers = answerArr[currentQuiz];
  if (reviewAnswers && reviewAnswers.length > 0) {
    reviewAnswers.forEach((reviewAnswer) => {
      answerEls.forEach((answerEl) => {
        if (answerEl.id === reviewAnswer) answerEl.checked = true;
      });
    });
  }
}

preBtnEl.addEventListener('click', () => {
  addAnswer();
  currentQuiz -= 1;
  renderQuiz();
});

nextBtnEl.addEventListener('click', () => {
  addAnswer();
  currentQuiz += 1;
  renderQuiz();
});

function checkBtn(currentQuiz) {
  currentQuiz == 0
    ? preBtnEl.setAttribute('disabled', '')
    : preBtnEl.removeAttribute('disabled', '');

  currentQuiz == myQuestions.length - 1
    ? nextBtnEl.setAttribute('hidden', '')
    : nextBtnEl.removeAttribute('hidden', '');

  currentQuiz == myQuestions.length - 1
    ? submitBtnEl.removeAttribute('hidden', '')
    : submitBtnEl.setAttribute('hidden', '');
}

submitBtnEl.addEventListener('click', () => {
  let confirmModal = new bootstrap.Modal(document.getElementById('confirm-modal'));

  let resultModal = new bootstrap.Modal(document.getElementById('result-modal'));

  let postResultModal = new bootstrap.Modal(document.getElementById('post-result-modal'));

  confirmModal.show();

  const confirmBtn = document.getElementById('confirm-yes');
  confirmBtn.addEventListener('click', () => {
    confirmModal.hide();
    resultModal.show();

    addAnswer();

    isSubmited = true;
    let corretAnswerReply = markTheQuiz();
    localStorage.setItem(CORRECT_ANSWER_ARR, JSON.stringify(corretAnswerReply));

    checkAnswerAfterSummit(corretAnswerReply);
    submitBtnEl.setAttribute('disabled', '');
    answerEls.forEach((answerEl) => answerEl.setAttribute('disabled', ''));

    createFeedback();
    feedbackBtn.removeAttribute('hidden');
  });

  saveMyMarkEl.addEventListener('click', () => {
    resultModal.hide();
    postResultModal.show();
    saveScore(totalScore, postResultModal);
  });
});

function markTheQuiz() {
  let correctAnswerReply = [];
  let score = 0;

  myQuestions.forEach((question, index) => {
    if (question.multi) {
      let compareArr = arrCompare(question.correctAnswer, answerArr[index]);
      if (compareArr) {
        score += 1;
        correctAnswerReply.push(index);
      }
    }

    if (question.correctAnswer === answerArr[index].join('')) {
      score += 1;
      correctAnswerReply.push(index);
    }
  });

  totalScore = (score / myQuestions.length) * 100;
  scoreEl.innerText = `Your score: ${totalScore.toFixed(0)}`;
  modalScoreEL.innerText = `Your score: ${totalScore.toFixed(0)}`;

  if (score >= myQuestions.length / 2) {
    passEl.removeAttribute('hidden');
    modalPassEL.removeAttribute('hidden');
  }

  if (score < myQuestions.length / 2) {
    failEl.removeAttribute('hidden');
    modalFailEL.removeAttribute('hidden');
  }

  return correctAnswerReply;
}

function checkAnswerAfterSummit() {
  const corretAnswerReply = JSON.stringify(localStorage.getItem(CORRECT_ANSWER_ARR));

  if (corretAnswerReply.indexOf(currentQuiz) > -1) {
    reviewCorrectEl.style.display = 'block';
    reviewIncorrectEl.style.display = 'none';
  } else {
    reviewIncorrectEl.style.display = 'block';
    reviewCorrectEl.style.display = 'none';
  }
}

function arrCompare(arr1, arr2) {
  return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
}

tryAgianBtn.addEventListener('click', () => {
  window.location.reload();
});
