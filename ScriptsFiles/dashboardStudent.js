/* ---------------------------- display userData ---------------------------- */
/* ---------------------------- get data form local storage ---------------------------- */

const getDataFeomLocalStorage = localStorage.getItem("userData") || "{}";
const ConvertDataToJson = JSON.parse(getDataFeomLocalStorage);
let UserName = document.querySelector("._UserName");
let UserEmail = document.querySelector("._UserEmail");

UserName.innerHTML = ConvertDataToJson.userName || "unknow";
UserEmail.innerHTML = ConvertDataToJson.userEmail || "unknow";

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
let data = [];
function AttachSearchEvents() {
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
        data.forEach(function (element, index) {
          if (element.title == result.value) {
            resultInArray.push(element);
          }
        });
        if (resultInArray.length !== 0) {
          Swal.fire({
            title: "Searched Data",
            html: table.outerHTML,
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
    didOpen: () => {
      document.querySelector(".swal2-container").style.zIndex = "100001";
    },
  });
}
AttachSearchEvents();
