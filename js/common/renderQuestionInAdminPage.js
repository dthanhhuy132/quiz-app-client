import questionApi from "../api/questionApi";

export default function renderQuestionInAdminPage(question, questionList) {
  const answerCorrect =
    question.correctAnswer.length > 1
      ? question.correctAnswer.join("")
      : question.correctAnswer;

  let questionItem = `
    <div class="col col-12 col-sm-12 col-md-6 col-xl-3">
      <div class="quiz quiz-question-${question.id}">
        <p class="question-index">
          <span class="question-number">Q.${question.id}:</span>
          <span class="question-text">${question.question}</span>
        </p>

        <ul class="answer-list">
          <li class="${answerCorrect.indexOf("a") > -1 ? "answer-true" : ""}">
            <span>a. <label for="a" id="a_text" >${
              question.answers.a
            }</label></span>
          </li>
          <li class="${answerCorrect.indexOf("b") > -1 ? "answer-true" : ""}">
            <span>b. <label for="b" id="b_text">${
              question.answers.b
            }</label></span>
          </li>
          <li class="${answerCorrect.indexOf("c") > -1 ? "answer-true" : ""}">
            <span>c. <label for="c" id="c_text">${
              question.answers.c
            }</label></span>
          </li>
          <li class="${answerCorrect.indexOf("d") > -1 ? "answer-true" : ""}">
            <span>d. <label for="d" id="d_text">${
              question.answers.d
            }</label></span>
          </li>
        </ul>

        <div class="quiz-options"> 
          <i class="fa-solid fa-trash question-delete" title="Delete question"></i>
        </div>

      </div>       
    </div>
    `;

  questionList.insertAdjacentHTML("beforeend", questionItem);

  let deleteBtn = document.querySelector(`.quiz-question-${question.id} i`);
  let deleteConfirmModal = new bootstrap.Modal(
    document.getElementById("deleteConfirmModal")
  );

  deleteBtn.addEventListener("click", (e) => {
    console.log("e.target", question);
    deleteConfirmModal.show();

    document.querySelector(
      ".delete-modal-body"
    ).innerHTML = `Are you sure to delete question: <strong>${question.question}</strong>?`;

    const confirmBtn = document.querySelector(".confirm-delete-btn");
    confirmBtn.addEventListener("click", () => {
      confirmBtn.disabled = true;
      questionApi.deleteQuestion(question.id).then((res) => {
        if (res.status < 300) {
          window.location.reload();
        }
      });
    });
  });
}
