/* ---------------------------------- Pobup --------------------------------- */
let allQuestions = document.querySelector("._allQuestions");

let Target = document.querySelector("#Target");
let pobup = document.getElementById("pobup");
let card = document.getElementById("card");
Target.addEventListener("click", function () {
  pobup.style.cssText = "display:flex;transition: all 0.4s linear;";
});
pobup.addEventListener("click", function (e) {
  if (!card.contains(e.target)) {
    pobup.style.display = "none";
  }
});
/* ---------------------------- if time is endded --------------------------- */
let result = document.querySelector("#_result");
let ifStudentFailed = document.querySelector("._uniqe");
let finalDegree = 0;
let correctAnswer = [];

if (localStorage.getItem("endedDate") !== null) {
  result.innerHTML = localStorage.getItem("endedDate");
  ifStudentFailed.style.display = "block";
  ifStudentFailed.addEventListener("click", function () {
    window.location.replace("/dashboardStudent.html");
  });
} else {
  const SelectedExamId = localStorage.getItem("SelectedExamId") || "{}";
  let currentExam = [];
  let currentExamQuestions = [];
  function displayQuestions(id) {
    fetch("Data/data.json")
      .then((response) => response.json())
      .then((data) => {
        let Exams = data.exams;
        currentExam = Exams[id];
        currentExamQuestions = currentExam.questions;
        currentExamQuestions.forEach(function (element) {
          correctAnswer.push(element.correctAnswer);
        });
        let res = localStorage.getItem("studentResult").split(",");
        for (let i = 0; i < res.length; i++) {
          if (res[i] === correctAnswer[i]) {
            finalDegree += 10;
            allQuestions.innerHTML += `<p style='color:green;'>${res[i]}</p>`;
          } else {
            allQuestions.innerHTML += `<p style='color:red;'>${res[i]}</p>`;
          }
        }
        if (finalDegree <= (res.length * 10) / 2) {
          result.innerHTML = `you are failed ,your degree is ${finalDegree} from ${
            res.length * 10
          }`;
          ifStudentFailed.style.display = "block";
          ifStudentFailed.addEventListener("click", function () {
            window.location.replace("/dashboardStudent.html");
          });
        } else {
          result.innerHTML = `${finalDegree} from ${res.length * 10}`;
        }
      })
      .catch((error) => {
        window.location.replace("/emptyData.html");
      });
  }
  displayQuestions(Number(SelectedExamId));
}

/* --------------------------------- loader --------------------------------- */

let loader = document.querySelector("._loader");
setTimeout(() => {
  loader.style.cssText = "display:none";
}, 2000);
