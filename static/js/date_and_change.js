let startDate = document.querySelector(".sdate");
let endDate = document.querySelector(".edate");

let startMonth = document.querySelector(".smonth");
let endMonth = document.querySelector(".emonth");

let startYear = document.querySelector(".syear");
let endYear = document.querySelector(".eyear");

let monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
initDay(startDate,31);
initDay(endDate,31);

initMonth(startMonth);
initMonth(endMonth);

initYear(startYear,1985,2021);
initYear(endYear,1985,2021);
function initDay(selectObj, n_days){
  let opt = document.createElement("option");
  opt.value = "nil";
  opt.textContent = "--";
  selectObj.appendChild(opt);
  for(let i=1;i<=n_days;i++){
    let opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    selectObj.appendChild(opt);
  }
}
function initMonth(selectObj){
  let opt = document.createElement("option");
  opt.value = "nil";
  opt.textContent = "---------------";
  selectObj.appendChild(opt);
  for(let i=0;i<monthList.length;i++){
    let opt = document.createElement("option");
    opt.value = monthList[i].toLowerCase();
    opt.textContent = monthList[i];
    selectObj.appendChild(opt);
  }
}
function initYear(selectObj, year_start, year_end){
  let opt = document.createElement("option");
  opt.value = "nil";
  opt.textContent = "----";
  selectObj.appendChild(opt);
  for(let i=year_start;i<=year_end;i++){
    let opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    selectObj.appendChild(opt);
  }
}

startMonth.addEventListener("change",CheckMonthChangeDay);
endMonth.addEventListener("change",CheckMonthChangeDay);

startYear.addEventListener("change",CheckYearChangeDay);
endYear.addEventListener("change",CheckYearChangeDay);

function CheckMonthChangeDay(e){
  let day = e.target.previousElementSibling;
  let monthStr = e.target.value;
  let year = e.target.nextElementSibling;
  if(isMonth31(monthStr)){
    if(day.lastElementChild.value != "31"){
        day.innerHTML = "";
        initDay(day,31);
        day.value = 1;
    }
  }
  else if(isMonth30(monthStr)){
    if(day.lastElementChild.value != "3 0"){
      day.innerHTML = "";
      initDay(day,30);
      day.value = 1;
    }
  }
    else if(monthStr == "february" && isLeapYear(year.value)){
    day.innerHTML = "";
    initDay(day,29);
    day.value = 1;
  }
  else if(monthStr == "february"){
    if(day.lastElementChild.value != "28"){
      day.innerHTML = "";
      initDay(day,28);
      day.value = 1;
    }
  }

}
function CheckYearChangeDay(e){
  let day = e.target.previousElementSibling.previousElementSibling;
  let monthStr = e.target.previousElementSibling.value;
  if(monthStr == "february" && isLeapYear(e.target.value)){
    day.innerHTML = "";
    initDay(day,29)
    day.value = 1;
  }
}
// Utility functions for dynamic date
function isMonth31(monthStr){
  if(monthStr == "january" || monthStr == "march" || monthStr == "may" || monthStr == "july" || monthStr == "august" || monthStr == "october" || monthStr == "december"){
      return true;
  }
  return false;
}
function isMonth30(monthStr){
  if(monthStr == "april" || monthStr == "june" || monthStr == "september" || monthStr == "november"){
      return true;
  }
  return false;
}
function isLeapYear(yearStr){
  let year = Number(yearStr);
  if(year % 4 == 0){
      return true;
  }
  return false;
}