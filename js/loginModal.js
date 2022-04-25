import pageLoaing from "./common/loadingPage";
import loadingPage from "./common/loadingPage";

const passwordIconEls = document.querySelectorAll(".password-icon");
const inputPasswordEl = document.querySelector(".input-password");
const inputEmailEl = document.querySelector(".input-email");

const loginBtn = document.querySelector("#login-button");
const loginAlertEl = document.querySelector(".invalid-feedback");
const modalHideBtn = document.querySelector("#login-button-cancel");

passwordIconEls.forEach((passwordIcon) => {
  passwordIcon.addEventListener("click", (e) => {
    if (e.target.className.indexOf("password-icon-show") > 0) {
      passwordIcon.parentElement.querySelector(".input-password").type = "text";
    } else {
      passwordIcon.parentElement.querySelector(".input-password").type =
        "password";
    }
    passwordIcon.parentElement.classList.toggle("show");
  });
});

loginBtn.addEventListener("click", () => {
  const emailValue = inputEmailEl.value;
  const passwordValue = inputPasswordEl.value;
  if (emailValue === "admin" && passwordValue === "admin") {
    pageLoaing.show("Loading page...");
    modalHideBtn.click();

    setTimeout(() => {
      window.location.assign("/admin.html");
    }, 1500);
  }

  if (emailValue !== "admin" || passwordValue !== "admin") {
    console.log("loginAlertEl", loginAlertEl);
    loginAlertEl.style.display = "block";
    loginAlertEl.innerText = "Your name or pasword is incorrect";
  }
});



