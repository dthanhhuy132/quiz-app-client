const feedbackListEl = document.querySelector('.feedback-list');

function renderFeedback(feedbacks) {
  feedbacks.forEach((feedback) => {
    deRenderFeedback(feedback);
  });
}

function deRenderFeedback(feedback) {
  let feedbackItem = `
  <div class="col col-sm-12 col-md-6 col-lg-4">
    <div class="feedback-wrapper">
      <h3 class="feedback-item__subject"><span class="feedback-item__subject-title">Subject:</span> ${feedback.subject}</h3>
      <p class="feedback-item__username"><span class="feedback-item__subject-name">Name:</span>  ${feedback.name}</p>
      <p class="feedback-item__content">"${feedback.content}"</p>
    </div>
  </div>
  `;
  feedbackListEl.insertAdjacentHTML('beforeend', feedbackItem);
}

export default renderFeedback;
