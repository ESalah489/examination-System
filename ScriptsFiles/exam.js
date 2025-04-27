let DataGet = [
  {
    title:
      "This Is My New TaskThis Is My New TaskThis Is My New TaskThis Is My New Task111",
    choosies: [
      "Create New To Do Tist Project11",
      "Create New To Do Tist Project12",
      "Create New To Do Tist Project13",
      "Create New To Do Tist Project14",
    ],
  },
  {
    title:
      "This Is My New TaskThis Is My New TaskThis Is My New TaskThis Is My New Task2222",
    choosies: [
      "Create New To Do Tist Project21",
      "Create New To Do Tist Project22",
      "Create New To Do Tist Project23",
      "Create New To Do Tist Project24",
    ],
  },
  {
    title:
      "This Is My New TaskThis Is My New TaskThis Is My New TaskThis Is My New Task333",
    choosies: [
      "Create New To Do Tist Project31",
      "Create New To Do Tist Project32",
      "Create New To Do Tist Project33",
      "Create New To Do Tist Project34",
    ],
  },
  {
    title:
      "This Is My New TaskThis Is My New TaskThis Is My New TaskThis Is My New Task444",
    choosies: [
      "Create New To Do Tist Project41",
      "Create New To Do Tist Project42",
      "Create New To Do Tist Project43",
      "Create New To Do Tist Project44",
    ],
  },
];
let QuestionInOnePage = 1;
let CurrentPage = 1;
function RenderQuestions() {
  let contentContainer = document.querySelector("._QuestionCard");
  contentContainer.innerHTML = "";
  let Start = (CurrentPage - 1) * QuestionInOnePage;
  let End = Start + QuestionInOnePage;
  let PageItems = DataGet.slice(Start, End);
  PageItems.forEach(function (element) {
    let oneQuestion = document.createElement("div");
    oneQuestion.classList.add("_Question");
    oneQuestion.innerHTML = `  
                    <div class="_QuestionTitle">
                      <p>
                       ${element.title}
                      </p>
                    </div>
                    <div class="_Options">
                      <button class="_Option">${element.choosies[0]}</button>
                      <button class="_Option">${element.choosies[1]}</button>
                      <button class="_Option">${element.choosies[2]}</button>
                      <button class="_Option">${element.choosies[3]}</button>
                    </div>
                  `;
    contentContainer.appendChild(oneQuestion);
    console.log(contentContainer);
  });
}
function NextPage() {
  if (CurrentPage * QuestionInOnePage < DataGet.length) {
    CurrentPage++;
    RenderQuestions();
  }
}
function PrevPage() {
  if (CurrentPage > 1) {
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
RenderQuestions();

/* ----------- not completed that will be handled when featch data ---------- */
const saveValue = document.querySelector("._MarkQ");
const MarkValue = document.querySelector("._Marks");
saveValue.addEventListener("click", function (event) {
  event.preventDefault();
  MarkValue.style.cssText = " display:flex;transition: all 0.2s linear;";
});
