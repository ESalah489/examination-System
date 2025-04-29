const btnSubmit = document.querySelector("#btn");
const nameValue = document.querySelector("._Name");
const emailValue = document.querySelector("._Email");
const passwordValue = document.querySelector("._Password");
const confiermPassValue = document.querySelector("._confiermPassword");

/* --------------------------- validation userName -------------------------- */
const rgsName = /^[a-zA-Z]{3,20}\s[a-zA-Z]{3,20}$/;
let trueName = false;
function checkUserName(userName) {
  const errorMessage = document.querySelector(".UserName-error");
  userName.addEventListener("input", function () {
    if (!userName.value.trim().match(rgsName)) {
      errorMessage.style.display = "flex";
      trueName = false;
    }
    if (userName.value.trim().match(rgsName) || this.value == "") {
      errorMessage.style.display = "none";
      trueName = true;
    }
    checkAllInputs();
  });
}
checkUserName(nameValue);

/* ---------------------------- validation email ---------------------------- */
let trueEmail = false;

const rgsEmail = /^[a-zA-Z0-9]{1,15}@(gmail|hotmail)\.com$/;
function checkEmail(userEmail) {
  const errorMessage = document.querySelector(".email-error");
  userEmail.addEventListener("input", function () {
    if (!userEmail.value.trim().match(rgsEmail)) {
      errorMessage.style.display = "flex";
      trueEmail = false;
    }
    if (userEmail.value.trim().match(rgsEmail) || this.value == "") {
      errorMessage.style.display = "none";
      trueEmail = true;
    }
    checkAllInputs();
  });
}
checkEmail(emailValue);

/* ---------------------------- validation password ---------------------------- */
let truePassword = false;

let passValue = "";
const rgsPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
function checkPassword(userpassword) {
  const errorMessage = document.querySelector(".password-error");
  userpassword.addEventListener("input", function () {
    if (!userpassword.value.trim().match(rgsPassword)) {
      errorMessage.style.display = "flex";
      truePassword = false;
    }
    if (userpassword.value.trim().match(rgsPassword) || this.value == "") {
      errorMessage.style.display = "none";
      truePassword = true;
    }
    passValue = userpassword.value.trim();
    checkAllInputs();
  });
}

/* ---------------------------- validation confirm password ---------------------------- */
let trueConfPassword = false;

function checkConfirmPassword(userConfermPassword) {
  const errorMessage = document.querySelector(".CPassword-error");
  userConfermPassword.addEventListener("input", function () {
    if (userConfermPassword.value.trim() !== passValue) {
      errorMessage.style.display = "flex";
      trueConfPassword = false;
    }
    if (userConfermPassword.value.trim() === passValue || this.value == "") {
      errorMessage.style.display = "none";
      trueConfPassword = true;
    }
    checkAllInputs();
  });
}
checkPassword(passwordValue);
checkConfirmPassword(confiermPassValue);
/* ---------------------------- validation on all inputs ---------------------------- */

function checkAllInputs() {
  if (
    trueName === false ||
    trueEmail === false ||
    truePassword === false ||
    trueConfPassword === false
  ) {
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

let usersData = [];
btnSubmit.addEventListener("click", function (e) {
  const userdata = {
    userName: nameValue.value.trim(),
    userEmail: emailValue.value.trim(),
    userPassword: passwordValue.value.trim(),
  };
  usersData.push(JSON.stringify(userdata));
  localStorage.setItem("userData", usersData);

  window.location.replace("../loginPage.html");
  nameValue.value = "";
  emailValue.value = "";
  passwordValue.value = "";
  confiermPassValue.value = "";
});

/* --------------------------------- loader --------------------------------- */

let loader = document.querySelector("._loader");
setTimeout(() => {
  loader.style.cssText = "display:none";
}, 2000);

/* ------------------------- Go To Login Using Link ------------------------- */

let link = document.querySelector("#_GoToLogin");

link.addEventListener("click", function () {
  window.location.replace("../loginPage.html");
});
