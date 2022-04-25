const feedbackListEl = document.querySelector('.feedback-list');

function renderFeedback(feedbacks) {
  console.log('feedbacks', feedbacks);

  feedbacks.forEach((feedback) => {
    deRenderFeedback(feedback);
  });
}

function deRenderFeedback(feedback) {
  let feedbackItem = `
  <div class="col col-12 col-sm-12 col-md-6 col-lg-4 feedback-wrapper">
    <h3 class="feedback-item__subject"><span class="feedback-item__subject-title">Subject:</span> ${feedback.subject}</h3>
    <p class="feedback-item__username"><span class="feedback-item__subject-name">Name:</span>  ${feedback.name}</p>
    <p class="feedback-item__content">"${feedback.content}"</p>
  </div>
  `;
  feedbackListEl.insertAdjacentHTML('beforeend', feedbackItem);
}

export default renderFeedback;
