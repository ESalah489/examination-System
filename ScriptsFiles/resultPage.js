/* ---------------------------- if time is endded --------------------------- */
let result = document.querySelector("#_result");

if (localStorage.getItem("endedDate") !== null) {
  result.innerHTML = localStorage.getItem("endedDate");
} else {
  result.innerHTML = ``;
}

/* --------------------------------- loader --------------------------------- */

let loader = document.querySelector("._loader");
setTimeout(() => {
  loader.style.cssText = "display:none";
}, 2000);
