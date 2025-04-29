/* ----------------------- get data from lacal Storage ---------------------- */
const SelectedExamId = localStorage.getItem("SelectedExamId") || "{}";

let contentContainer = document.querySelector("._QuestionCard");
let currentExam = [];
let currentExamQuestions = [];

function displayQuestions(id) {
  fetch("Data/data.json")
    .then((response) => response.json())
    .then((data) => {
      let Exams = data.exams;
      currentExam = Exams[id];
      currentExamQuestions = currentExam.questions;
      RenderQuestions();
    })
    .catch((error) => {
      console.log(error);
    });
}

displayQuestions(Number(SelectedExamId));

let QuestionInOnePage = 1;
let CurrentPage = 0;
let currentIndexFlag = 0;

function RenderQuestions() {
  contentContainer.innerHTML = "";
  let Start = CurrentPage * QuestionInOnePage;
  let End = Start + QuestionInOnePage;
  let PageItems = currentExamQuestions.slice(Start, End);
  PageItems.forEach(function (element) {
    currentIndexFlag = element.qid;
    let oneQuestion = document.createElement("div");
    oneQuestion.classList.add("_Question");
    oneQuestion.innerHTML = `  
                    <div class="_QuestionTitle">
                      <p>
                       ${element.questionText}
                      </p>
                    </div>
                    <form class="_Options">
                      <div class="_Option"><input type="radio" name="anser"><span>${element.answers[0]}</span></div>
                      <div class="_Option"><input type="radio" name="anser"><span>${element.answers[1]}</span></div>
                      <div class="_Option"><input type="radio" name="anser"><span>${element.answers[2]}</span></div>
                      <div class="_Option"><input type="radio" name="anser"><span>${element.answers[3]}</span></div>
                     </form>
                  `;
    contentContainer.appendChild(oneQuestion);

    let savedAnswers = localStorage.getItem("studentResult");
    if (savedAnswers) {
      let savedArray = savedAnswers.split(",");
      let selectedAnswer = savedArray[element.qid];
      if (selectedAnswer) {
        let options = oneQuestion.querySelectorAll("._Option");
        options.forEach((option) => {
          if (
            option.querySelector("span").textContent.trim() ===
            selectedAnswer.trim()
          ) {
            option.querySelector('input[type="radio"]').checked = true;
          }
        });
      }
    }

    ClickOption();
  });
}
function NextPage() {
  let maxPages = Math.ceil(currentExamQuestions.length / QuestionInOnePage);
  if (CurrentPage + 1 < maxPages) {
    CurrentPage++;
    RenderQuestions();
  }
}
function PrevPage() {
  if (CurrentPage > 0) {
    CurrentPage--;
    RenderQuestions();
  }
}
let Prev = document.querySelector("#_Prev");
let Next = document.querySelector("#_Next");
Prev.addEventListener("click", function () {
  PrevPage();
});
Next.addEventListener("click", function () {
  NextPage();
});

/* ---------------------------------- flag ---------------------------------- */
let MarkQ = document.querySelector("._MarkQ");
let Flags = document.querySelector("._MarkAll");
let MarksInResponsive = document.querySelector("._MarksInResponsive");
let indexsinflag = [];
function createMark(container, currentIndexFlag) {
  let OneFlag = document.createElement("div");
  OneFlag.classList.add("_OneQ");
  indexsinflag.push(currentIndexFlag);
  OneFlag.innerHTML = `<p class="_QNumber">question num: ${currentIndexFlag}</p><i class="bx bx-trash error-icon icon-delete"></i>`;
  container.appendChild(OneFlag);
  DeleteFlag();
}

MarkQ.addEventListener("click", function () {
  if (window.innerWidth < 900) {
    createMark(MarksInResponsive, currentIndexFlag);
  } else {
    if (indexsinflag.includes(currentIndexFlag)) {
      DeleteFlag();
    } else {
      createMark(Flags, currentIndexFlag);
    }
  }
});

/* ----------------------------- delete on flag ----------------------------- */
function DeleteFlag() {
  let deleteIcons = document.querySelectorAll(".icon-delete");
  deleteIcons.forEach(function (icon) {
    icon.onclick = function () {
      this.parentElement.remove();
    };
  });
}

// /* ----------------------------- when ckick on any falge return it to question  ----------------------------- */
// function ReturnToQuestion() {
//   let question = document.querySelectorAll("._QNumber");
//   question.forEach(function (ques) {
//     question.onclick = function () {
//     };
//   });
// }

/* ------------------------------ counter time ------------------------------ */

let duration = 2 * 60;
let countDownDate = new Date().getTime() + duration * 1000;
let times = setInterval(function () {
  let now = new Date().getTime();

  let distance = countDownDate - now;

  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById(
    "Timer"
  ).innerHTML = `<p>${minutes}</p><span>:</span><p>${seconds}</p>`;
  localStorage.removeItem("endedDate", "you are flunked");

  if (distance < 0) {
    clearInterval(times);
    document.getElementById("Timer").innerHTML = `<p>EXPIRED</p>`;
    localStorage.setItem("endedDate", "you are flunked");
  }
  dateIsEnded();
}, 1000);

// /* ---------------- when user click on input make raido work and store answers ---------------- */
let finshExam = document.getElementById("finshExam");
let studentAnswers = [];
let res;
function ClickOption() {
  let options = document.querySelectorAll("._Option");
  options.forEach(function (option) {
    option.onclick = function () {
      const radio = option.querySelector('input[type="radio"]');
      radio.checked = true;
      const answerText = option.querySelector("span").textContent;
      studentAnswers[currentIndexFlag] = answerText;
      localStorage.setItem("studentResult", studentAnswers);
      console.log(localStorage.getItem("studentResult"));
      res = localStorage.getItem("studentResult").split(",");
      console.log(WhenNoAnswerYet);
      if (res.length !== 6) {
        finshExam.disabled = true;
      } else {
        finshExam.disabled = false;
      }
    };
  });
}

/* ------ handle if user chick on finsh and he not select ant question ------ */
let WhenNoAnswerYet = localStorage.getItem("studentResult");
console.log(WhenNoAnswerYet);
if (WhenNoAnswerYet === null) {
  finshExam.disabled = true;
}
/* ------------------ handle if data not ended go to result page ----------------- */
finshExam.addEventListener("click", function () {
  if (localStorage.getItem("endedDate") === null) {
    clearInterval(times);
    window.location.replace("/resultPage.html");
  }
});

/* ------------------ handle if data ended go to result page ----------------- */
function dateIsEnded() {
  if (localStorage.getItem("endedDate") !== null) {
    window.location.replace("/resultPage.html");
  }
}
