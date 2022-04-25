const modalTitleEl = document.querySelector("#adminModal-title");

function setTitleModalAdminPage(text = "New Question") {
  modalTitleEl.innerHTML = text;
}

export default setTitleModalAdminPage;
