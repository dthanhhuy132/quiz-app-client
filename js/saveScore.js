import userApi from './api/userApi';
import renderTableMark, { resetTableMark } from './markTable';

const userName = document.querySelector('#post-result-modal #user-name');
const userEmail = document.querySelector('#post-result-modal #user-email');
const userScore = document.querySelector('#post-result-modal #user-score');

const saveScoreToServerBtn = document.getElementById('post-mark-to-server');

function saveScore(score, postResultModal) {
  userScore.value = score;

  saveScoreToServerBtn.addEventListener('click', () => {
    console.log(userName, userEmail, userScore);

    let markData = {
      userName: userName.value,
      userEmail: userEmail.value,
      score: score.toFixed(2),
    };

    if (userEmail.value == '' || userEmail.value == '') {
      window.alert('Plese enter your name and your email');
    } else {
      console.log('markData', markData);
      saveScoreToServerBtn.disabled = true;
      userApi.addNewUserAndMark(markData).then((res) => {
        if (res.status < 300) {
          resetTableMark();
          renderTableMark();
          postResultModal.hide();
          setTimeout(() => {
            saveScoreToServerBtn.disabled = false;
          }, 5000);
        } else {
          postResultModal.hide();
          window.alert('Network error!!!');
          setTimeout(() => {
            saveScoreToServerBtn.disabled = false;
          }, 5000);
        }
      });
    }
  });
}

export default saveScore;
