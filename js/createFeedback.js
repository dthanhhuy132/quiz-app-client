import feedbackApi from './api/feedbackApi';

const userNameEl = document.getElementById('feedback-name');
const userEmailEl = document.getElementById('feedback-email');
const subjectEl = document.getElementById('feedback-subject');
const feedbackContentEl = document.getElementById('feedback-content');

const openFeedbackModalBtn = document.getElementById('feed-back-btn');

const postMyFeedBackBtn = document.getElementById('post-feedback-to-server');
console.log('postMyFeedBackBtn', postMyFeedBackBtn);

function createFeedback() {
  let feedbackModal = new bootstrap.Modal(document.getElementById('feedback-modal'));

  openFeedbackModalBtn.addEventListener('click', () => {
    feedbackModal.show();
  });

  postMyFeedBackBtn.addEventListener('click', () => {
    let feedbackData = {
      name: userNameEl.value,
      email: userEmailEl.value,
      subject: subjectEl.value,
      content: feedbackContentEl.value,
    };

    if (
      userEmailEl.value == '' ||
      userEmailEl.value == '' ||
      subjectEl.value == '' ||
      feedbackContentEl.value == ''
    ) {
      window.alert('Plase enter all input fiels');
    } else {
      postMyFeedBackBtn.disabled = true;

      feedbackApi.addNewFeedback(feedbackData).then((res) => {
        if (res.status < 300) {
          feedbackModal.hide();
          window.alert('Your feedback was sent!!! ahihi');
        } else {
          feedbackModal.hide();
          window.alert('Your network is so bad!!!');
        }
      });

      setTimeout(() => {
        postMyFeedBackBtn.disabled = false;
      }, 5000);
    }
  });
}

export default createFeedback;
