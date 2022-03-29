// ------------------------------------------ Filling Elements for the required fields
document.getElementById('full-name').textContent = localStorage.getItem("first-name") + " " + localStorage.getItem("last-name");
document.getElementById('resume-objective').textContent = localStorage.getItem('cv-objective');
document.getElementById('phone-no').textContent = localStorage.getItem("phone-no");
document.getElementById('e-mail').textContent = localStorage.getItem("e-mail");
document.getElementById('address').textContent = localStorage.getItem("address");
document.getElementById('place').textContent = localStorage.getItem("city-town");
document.getElementById('zip-code').textContent = localStorage.getItem("zipcode");
// Skills are seperated by '.', therefore extracting each skill in an array
let skill_list = document.getElementById('skill-container');//Element of the template
let skills = localStorage.getItem('skill');// value from the form submitted
while(skills.length > 0 && skills.charAt(skills.length-1) == "."){//while the last char of skills is a '.' then keep removing it
  skills = skills.substring(0,skills.length-1);
  console.log(skills);
}
//The function split return an array whos elements are split by a '.' 
let skillArr = skills.split(".");
// Performing function on that array
for(let i = 0; i < skillArr.length ; i++){//This loop creates a div element and adds it to the skill container
  const skill = document.createElement("div");
  skill.textContent = skillArr[i];
  skill.classList.add('skill-item');
  skill.classList.add('skill-list-icon');
  skill.classList.add('mb-1');

  skill_list.appendChild(skill);
}
// ------------------------------------------ Filling Required field ends here

// ------------------------------------------ Filling Elements for non-required fields
const experience_section = document.getElementById("experience-section");
  let work_experience_containers = [];
  work_experience_containers[0] = document.getElementById("we-1");
  work_experience_containers[1] = document.getElementById("we-2");
  work_experience_containers[2] = document.getElementById("we-3");
const education_section = document.getElementById("education-section");
  const post_edu_section = document.getElementById("post-section");
  const bach_edu_section = document.getElementById("bach-section");
const reference_section = document.getElementById("reference-section");
const interest_section = document.getElementById("interests-section");
  const hobbies = document.getElementById("hobbies");
// ------------------------------------------ child nodes for non-required fields (specific ones)
let ref_fields = document.querySelectorAll("#reference-section [id]");
function ProcessAndFill_ExperienceValues(which, key1, key2, key3, key4, key5, key6, key7, key8){
  document.getElementById("company-"+which).textContent = localStorage.getItem(key1);
  document.getElementById("location-"+which).textContent = localStorage.getItem(key2);
  document.getElementById("designation-"+which).textContent = localStorage.getItem(key3);
  document.getElementById("description-"+which).textContent = localStorage.getItem(key8);

  const startMonth = localStorage.getItem(key4);
  const startYear = localStorage.getItem(key5);
  const endMonth = localStorage.getItem(key6);
  const endYear = localStorage.getItem(key7);

  document.getElementById("start-end-date-"+which).textContent = startMonth + " " + startYear + " - " + endMonth + " " +endYear;
}
function ProcessAndFill_EducationValues(which, key1, key2, key3, key4){
  document.getElementById(which+"-institute").textContent = localStorage.getItem(key1);
  document.getElementById(which+"-place").textContent = localStorage.getItem(key2);
  document.getElementById(which+"-degree").textContent = localStorage.getItem(key3);
  document.getElementById(which+"-year").textContent = localStorage.getItem(key4);
}
function ProcessAndFill_ReferenceValues(which, key1, key2, key3, key4, key5){
  document.getElementById(which+"-name").textContent = localStorage.getItem(key1);
  document.getElementById(which+"-designation").textContent = localStorage.getItem(key2);
  document.getElementById(which+"-company").textContent = localStorage.getItem(key3);
  document.getElementById(which+"-phone").textContent = localStorage.getItem(key4);
  document.getElementById(which+"-mail").textContent = localStorage.getItem(key5);

}
// ------------------------------------------ Filling those fields which the user may or may not input
if(isNotNullAndNotEmpty(localStorage.getItem("image"))){
  document.getElementById("profile-image").setAttribute("src", localStorage.getItem("image"));
}
else{
  document.getElementById("image-container").remove();
}

if(isNotNullAndNotEmpty(localStorage.getItem('website'))){
  document.getElementById('website').textContent = localStorage.getItem('website');
}

if(isNotNullAndNotEmpty(localStorage.getItem('linked-in'))){
  document.getElementById('linkedin-id').textContent = localStorage.getItem('linked-in');
}

if(isNotNullAndNotEmpty(localStorage.getItem('hobbies'))){
  hobbies.textContent = localStorage.getItem('hobbies');
}
else{
  interest_section.remove();
}

if( !isNotNullAndNotEmpty(localStorage.getItem("post-degree")) && !isNotNullAndNotEmpty(localStorage.getItem("bach-degree"))){
  education_section.remove();
}
else{
  if(isNotNullAndNotEmpty(localStorage.getItem("post-degree"))){
    ProcessAndFill_EducationValues("post","post-institute","post-place","post-degree","post-year");
  }
  else{
    post_edu_section.remove();
  }
  if(isNotNullAndNotEmpty(localStorage.getItem("bach-degree"))){
    ProcessAndFill_EducationValues("bach","bach-institute","bach-place","bach-degree","bach-year");
  }
  else{
    bach_edu_section.remove();
  }
}

if(!isNotNullAndNotEmpty(localStorage.getItem("exp-company"+1)) && !isNotNullAndNotEmpty(localStorage.getItem("exp-company"+2)) && !isNotNullAndNotEmpty(localStorage.getItem("exp-company"+3))){
  console.log("here");
  experience_section.remove();
}
else{
  for(let i = 1;i<=3;i++){
    if(isNotNullAndNotEmpty(localStorage.getItem("exp-company"+i))){
      ProcessAndFill_ExperienceValues(i,"exp-company"+i,"exp-place"+i,"exp-title"+i,"start-month"+i,"start-year"+i,"end-month"+i,"end-year"+i,"exp-description"+i);
    }
    else{
      work_experience_containers[i-1].remove();
    }
  }
}

if(isNotNullAndNotEmpty(localStorage.getItem("referee-name"))){
  ProcessAndFill_ReferenceValues("ref", "referee-name", "referee-designation", "referee-company", "referee-phone", "referee-email");
}
else{
  reference_section.remove();
}

// Utility Function
function isNotNullAndNotEmpty(value){
  if(value != "" && value != null) return true;
  return false;
}
// ------------------------------------------ Filling ends here

function generatePDF(e) {
  window.print();
}
