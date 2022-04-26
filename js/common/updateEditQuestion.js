function updateEditQuestion(updateQuestion, questionId) {
  const currentQuestion = document.querySelector(`.question-id-${questionId}`);

  const answerCorrect =
    updateQuestion.correctAnswer.length > 1
      ? updateQuestion.correctAnswer.join('')
      : updateQuestion.correctAnswer;

  currentQuestion.innerHTML = `
    <p class="question-index">
      <span class="question-number">Q.${updateQuestion.id}:</span>
      <span class="question-text">${updateQuestion.question}</span>
    </p>

    <ul class="answer-list">
      <li class="${answerCorrect.indexOf('a') > -1 ? 'answer-true' : ''}">
        <span>a. <label for="a" id="a_text" >${updateQuestion.answers.a}</label></span>
      </li>
      <li class="${answerCorrect.indexOf('b') > -1 ? 'answer-true' : ''}">
        <span>b. <label for="b" id="b_text">${updateQuestion.answers.b}</label></span>
      </li>
      <li class="${answerCorrect.indexOf('c') > -1 ? 'answer-true' : ''}">
        <span>c. <label for="c" id="c_text">${updateQuestion.answers.c}</label></span>
      </li>
    <li class="${answerCorrect.indexOf('d') > -1 ? 'answer-true' : ''}">
        <span>d. <label for="d" id="d_text">${updateQuestion.answers.d}</label></span>
    </li>
    </ul>
  `;
}

export default updateEditQuestion;
