import userApi from './api/userApi';

const tableMarkEL = document.querySelector('.table-mark .table-score');
console.log('tableMarkEL', tableMarkEL);

async function renderTableMark() {
  let markArr = await userApi.getAllUserMark();

  if (markArr) {
    let topFive = markArr.data.sort((a, b) => b.score - a.score).splice(0, 5);
    topFive.forEach((mark, index) => {
      renderMark(mark, index);
    });
  }
}

export function resetTableMark() {
  tableMarkEL.innerHTML = '';
}

function renderMark(user, index) {
  let num = index + 1;
  const markItem = `
  <tr>
    <td class="table-col-1">${num}</td>
    <td class="table-col-2">${user.userName}</td>
    <td class="table-col-3">${user.score}</td>
  </tr>
  `;

  tableMarkEL.insertAdjacentHTML('beforeend', markItem);
}

export default renderTableMark;
