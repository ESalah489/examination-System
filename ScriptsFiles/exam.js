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
function RenderQuestions() {
  contentContainer.innerHTML = "";
  let Start = CurrentPage * QuestionInOnePage;
  let End = Start + QuestionInOnePage;
  let PageItems = currentExamQuestions.slice(Start, End);
  PageItems.forEach(function (element) {
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

/* ----------- not completed that will be handled when featch data ---------- */
const saveValue = document.querySelector("._MarkQ");
const MarkValue = document.querySelector("._Marks");
saveValue.addEventListener("click", function (event) {
  event.preventDefault();
  MarkValue.style.cssText = " display:flex;transition: all 0.2s linear;";
});
/* ---------------------------------- flag ---------------------------------- */
let MarkQ = document.querySelector("._MarkQ");
let Flags = document.querySelector("._MarkAll");
let MarksInResponsive = document.querySelector("._MarksInResponsive");

function createMark(container) {
  let OneFlag = document.createElement("div");
  OneFlag.classList.add("_OneQ");
  OneFlag.innerHTML = `<p class="_QNumber">Lorem</p><i class="bx bx-trash error-icon icon-delete"></i>`;
  container.appendChild(OneFlag);
}

MarkQ.addEventListener("click", function () {
  if (window.innerWidth < 900) {
    createMark(MarksInResponsive);
  } else {
    createMark(Flags);
  }
});
