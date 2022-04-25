export function checkEnoughQuestionAnswer(answersArr) {
  let answersArrValue = Object.values(answersArr);

  let isCheck = true;
  answersArrValue.forEach(function (item) {
    if (item.length === 0 || item.trim() === "" || item == "") isCheck = false;
  });

  return isCheck;
}
