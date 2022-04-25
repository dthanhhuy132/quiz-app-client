export default function resetAddEditQuestionFormAdmin() {
  const questionQuiz = document.querySelector('.question-quiz-text');
  const correctAnswers = document.querySelectorAll('.answer-correct:checked');
  const answersQuiz = document.querySelectorAll('.question-quiz-answer');

  questionQuiz.value = '';

  correctAnswers.forEach((item) => {
    item.checked = false;
  });

  answersQuiz.forEach((item) => {
    item.value = '';
  });
}
