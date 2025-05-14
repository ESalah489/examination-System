/* ---------------------------- display userData ---------------------------- */
/* ---------------------------- get data form local storage ---------------------------- */

const getDataFeomLocalStorage = localStorage.getItem("userData") || "{}";
const ConvertDataToJson = JSON.parse(getDataFeomLocalStorage);

let UserName = document.querySelector("._UserName");
let UserEmail = document.querySelector("._UserEmail");

UserName.innerHTML = ConvertDataToJson.userName || "unknow";
UserEmail.innerHTML = ConvertDataToJson.userEmail || "unknow";

/* ----------------------- featch exams form json file ----------------------- */
let CoursesBox = document.querySelector("._CoursesBox");
function displayDataDinamic() {
  fetch("Data/data.json")
    .then((response) => response.json())
    .then((data) => {
      let Exams = data.exams;
      AttachSearchEvents(Exams);
      Exams.forEach((element, index) => {
        let CoursesItem = document.createElement("div");
        /* ------------------------------ for animation ----------------------------- */
        CoursesItem.setAttribute("data-aos", "zoom-in");
        CoursesItem.setAttribute("data-aos-delay", `${index * 50}`);
        CoursesItem.setAttribute("data-aos-duration", "1000");
        CoursesItem.setAttribute("data-aos-easing", "ease-in-out");
        /* -------------------------------------------------------------------------- */
        CoursesItem.classList.add("_CoursesItem");
        CoursesItem.classList.add("child-class");
        CoursesItem.setAttribute("id", element.id);
        CoursesItem.innerHTML = `
           <a href="#" class="_CoursesItemlink" onclick='displayQuestions(element.id)'>
              <div class="_CoursesItembg"></div>
                <div class="_CoursesItemTitle">${element.title}</div>
                <div class="_CoursesItemDisc">${element.description}</div>
                <div class="_CoursesItemDateBox">Data:<span class="_CoursesItemDate"> ${element.date} </span>
              </div>
            </a>`;
        CoursesBox.appendChild(CoursesItem);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
displayDataDinamic();
/* ---------------------------------- Pobup --------------------------------- */
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

/* ----------------------- Search about value in table ---------------------- */
// let data = [];
function AttachSearchEvents(datafromjson) {
  let Search = document.querySelector("#Search");
  Search.addEventListener("click", function (e) {
    e.preventDefault();
    Swal.fire({
      title: "Search Exam",
      input: "text",
      inputLabel: "Enter Exam Name",
      inputPlaceholder: "Type here...",
      showCancelButton: true,
      confirmButtonText: "Search",
      confirmButtonColor: "#202d48",
    }).then((result) => {
      if (result.isConfirmed) {
        let resultInArray = [];
        datafromjson.forEach(function (element) {
          if (element.title == result.value) {
            resultInArray.push(element);
          }
        });
        let Searchedvalue = document.createElement("div");
        Searchedvalue.classList.add("_containerSearchedValues");
        resultInArray.forEach(function (element) {
          let onecard = document.createElement("div");
          onecard.classList.add("_cardSearchedValues");
          onecard.innerHTML = `<h1 class='_Title'>${element.title}</h1><p class='_Disc'>${element.description}</p><p class='_Date'>${element.date}</p>`;
          Searchedvalue.appendChild(onecard);
        });
        if (resultInArray.length !== 0) {
          Swal.fire({
            title: "Searched Data",
            html: Searchedvalue,
            width: "80%",
          });
        } else {
          NoData();
        }
      }
    });
  });
}
function NoData() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "No Data Founded",
    showConfirmButton: false,
    timer: 1500,
  });
}
/* ------------------------------- go to exam ------------------------------- */
CoursesBox.addEventListener("click", function (e) {
  let clickedChild = e.target.closest(".child-class");
  if (clickedChild) {
    let courseId = clickedChild.getAttribute("id");
    localStorage.setItem("SelectedExamId", courseId);
    localStorage.removeItem("studentResult");
    localStorage.removeItem("endedDate");
    window.location.replace(`/exam.html`);
  }
});
