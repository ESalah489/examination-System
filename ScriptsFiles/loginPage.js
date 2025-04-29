const btnSubmit = document.querySelector("#btn");
const emailValue = document.querySelector("._Email");
const passwordValue = document.querySelector("._Password");
const CheckrdValue = document.querySelector("._checkBoxField");

/* ---------------------------- get data form local storage ---------------------------- */

const getDataFeomLocalStorage = localStorage.getItem("userData") || "{}";
const ConvertDataToJson = JSON.parse(getDataFeomLocalStorage);

/* ---------------------------- validation email ---------------------------- */
let trueEmail = false;
let UserEmailFromLocal = ConvertDataToJson.userEmail;
function checkEmail(userEmail) {
  const errorMessage = document.querySelector("._Email-error");
  console.log(errorMessage);
  userEmail.addEventListener("input", function () {
    if (userEmail.value.trim() !== UserEmailFromLocal || this.value == "") {
      errorMessage.style.display = "flex";
      trueEmail = false;
    } else {
      errorMessage.style.display = "none";
      trueEmail = true;
    }
    checkAllInputs();
  });
}
checkEmail(emailValue);

// /* ---------------------------- validation password ---------------------------- */
let truePassword = false;
let UserPassFromLocal = ConvertDataToJson.userPassword;

function checkPassword(userpassword) {
  const errorMessage = document.querySelector("._Password-error");
  userpassword.addEventListener("input", function () {
    if (userpassword.value.trim() !== UserPassFromLocal || this.value == "") {
      errorMessage.style.display = "flex";
      truePassword = false;
    } else {
      errorMessage.style.display = "none";
      truePassword = true;
    }
    checkAllInputs();
  });
}
checkPassword(passwordValue);
// /* ---------------------------- validation checkbox ---------------------------- */
let trueCheckBox = CheckrdValue.checked;

function checkBox(CheckrdValue) {
  CheckrdValue.addEventListener("change", function () {
    if (CheckrdValue.checked) {
      trueCheckBox = true;
    } else {
      trueCheckBox = false;
    }

    checkAllInputs();
  });
}
checkBox(CheckrdValue);

// /* ---------------------------- validation on all inputs ---------------------------- */

function checkAllInputs() {
  if (trueEmail === false || truePassword === false || trueCheckBox === false) {
    btnSubmit.setAttribute("disabled", true);
    btnSubmit.style.backgroundColor = "#202d4870";
  } else {
    btnSubmit.removeAttribute("disabled");
    btnSubmit.style.backgroundColor = "#202d48";
  }
}
btnSubmit.addEventListener("mouseover", function () {
  if (this.disabled === true) {
    this.style.cssText = "border:none;color:#fff;background-color:#202d4870;";
  }
});

btnSubmit.addEventListener("click", function (e) {
  window.location.replace("../dashboardStudent.html");
  emailValue.value = "";
  passwordValue.value = "";
});

/* --------------------------------- loader --------------------------------- */

let loader = document.querySelector("._loader");
setTimeout(() => {
  loader.style.cssText = "display:none";
}, 2000);
/* ------------------------- Go To Sign up Using Link ------------------------- */

let link = document.querySelector("#_GoToLogin");

link.addEventListener("click", function () {
  window.location.replace("signupPage.html");
});
