const loadingPageEl = document.querySelector(".loading-page");
const loadingTextDescEl = document.querySelector(".text-description");

const pageLoaing = {
  show(textDecs = "Welcome to JS Quiz-app") {
    loadingPageEl.style.display = "flex";
    loadingTextDescEl.innerText = textDecs;
  },

  hide() {
    loadingPageEl.style.display = "none";
  },
};

export default pageLoaing;
