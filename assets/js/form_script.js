// -------------------------------- Removing the image file on load from localStorage
// see to this code later
localStorage.removeItem("image");
// -------------------------------- Removing some contents of the local storage on load
// RemoveWorkExperience(work_experience_fields);
//--------------------------------- selecting Image file and other related functions
const img_file = document.getElementById("image-file");
img_file.addEventListener("change", applyAndSaveImage);
// When an image file is selected by the user, this function will first create an image element and then add the image URL to the img element's source
function applyAndSaveImage(e) {
  const files = e.target.files;
  if (!files || !files.length) return
  const avatarImageFile = files[0];
  const avatarImageUrl = URL.createObjectURL(avatarImageFile);
  const img_tag = document.createElement("img");
  img_tag.src = avatarImageUrl;
  img_tag.height = 150;
  e.target.previousElementSibling.innerHTML = "";
  e.target.previousElementSibling.appendChild(img_tag);
  // Save it in localStorage
  const reader = new FileReader();
  reader.readAsDataURL(avatarImageFile);
  reader.addEventListener('load', (e) => {
    localStorage.setItem("image", reader.result);
  });
}
// --------------------------------- image part ends here

//---------------------------------- Toggling between the visibility of the hidden elements

function toggleVisibility(e) {
  const addInfoContainer = e.target.previousElementSibling;
  addInfoContainer.classList.toggle("expand");
  if (addInfoContainer.classList.contains("expand")) {
    e.target.textContent = "Hide Additional Information";
  }
  else {
    e.target.textContent = "Show Additional Information";
  }
}
// select the elements who's state you want to toggle
const perToggleBtn = document.querySelector("#per-toggle");
const expToggleBtn = document.querySelector("#exp-toggle");

// and associate a click event to those elements
perToggleBtn.addEventListener("click", toggleVisibility);
expToggleBtn.addEventListener("click", toggleVisibility);

// -------------------------------- Toggling ends here

//------------------------------------ Actions when template is selected
let templates = [];
// +++add templates here if want to add any, and that would be it
// the id's for these template are associated with the <label></label> tag
templates[0] = document.getElementById("template-1");
templates[1] = document.getElementById("template-2");
templates[2] = document.getElementById("template-3");
let redirect_link;
for (let i = 0; i < templates.length; i++) {//assigning event listeners to the templates
  templates[i].addEventListener('change', whenChecked)
}
// when any one radio button is checked, this function will add some class to the template-icon.
function whenChecked(e) {
  redirect_link = e.target.value;
  add_class(template_icon, "complete")
  Add_RemoveClass(template_icon, "box-shadow-green", "box-shadow");
  next_button.disabled = false;
}

function unCheck(tempArray) {
  for (let i = 0; i < tempArray.length; i++) {
    tempArray[i].checked = false;
  }
}

// -------------------------------- Next step procedure 
// Selecting all the section containing forms
// Section which will transition on next step and previous step
const personal_form = document.querySelector("#personal-section");
const experience_form = document.querySelector("#experience-section");
const template_form = document.querySelector("#template-section");
// Selecting the icons of the forms
const personal_icon = document.querySelector("#personal-icon");
const experience_icon = document.querySelector("#experience-icon");
const template_icon = document.querySelector("#template-icon");
// selecting the next-step button
const next_button = document.querySelector("#next-btn");
// selecting the previous-step button
const previous_button = document.querySelector("#prev-btn");

let valid_flag = false;//put this as false during validation
// -------------------------------------- Form display function
function displayWithTransition(transition_form, display_form, translateValue) {
  transition_form.style = "transform : translateX(" + translateValue + "%); opacity : 0";
  setTimeout(() => {
    add_class(transition_form, "d-none");
    transition_form.style = "transform : translateX(0); opacity : 1";
  }, 1000);
  setTimeout(() => {
    remove_class(display_form, "d-none");
  }, 1000);
}
function nextForm(e) {
  if (e.target.classList.contains("personal-form-btn") && valid_flag) {
    Add_RemoveClass(e.target, "experience-form-btn", "personal-form-btn");
    Add_RemoveClass(previous_button, "personal-form-btn", "d-none");

    disable_enable([e.target, previous_button], 3000);

    add_class(personal_icon, "complete");
    Add_RemoveClass(personal_icon, "box-shadow-green", "box-shadow");
    // Transition part
    displayWithTransition(personal_form, experience_form, -50);
  }
  else if (e.target.classList.contains("experience-form-btn") && valid_flag) {
    Add_RemoveClass(e.target, "template-form-btn", "experience-form-btn");
    Add_RemoveClass(previous_button, "experience-form-btn", "personal-form-btn");
    // Changing some property of button
    e.target.textContent = 'Submit';
    e.target.disabled = true;
    add_class(experience_icon, "complete");
    Add_RemoveClass(experience_icon, "box-shadow-green", "box-shadow");
    // Transition pare
    displayWithTransition(experience_form, template_form, -50);
  }
  else if (e.target.classList.contains("template-form-btn") && valid_flag) {
    saveValuesToLocalStorage(inputList);
    // When the user submits the form, this will uncheck all the selected templates
    unCheck(templates);
    e.target.disabled = true;
    window.open(redirect_link, '_blank');
    // window.location.href = "test_template.html";
  }
}

function previousForm(e) {
  disable_enable([e.target, next_button], 3000);
  if (e.target.classList.contains("personal-form-btn")) {

    Add_RemoveClass(e.target, "d-none", "personal-form-btn");
    Add_RemoveClass(next_button, "personal-form-btn", "experience-form-btn");

    displayWithTransition(experience_form, personal_form, 50);

  }
  else if (e.target.classList.contains("experience-form-btn")) {

    Add_RemoveClass(e.target, "personal-form-btn", "experience-form-btn");
    Add_RemoveClass(next_button, "experience-form-btn", "template-form-btn");
    // adding the text and the icon which was previously removed for next step
    next_button.textContent = 'next step ';
    const icon = document.createElement("i");
    add_class(icon, "fa");
    add_class(icon, "fa-forward");
    next_button.appendChild(icon);

    displayWithTransition(template_form, experience_form, 50);
  }
}

next_button.addEventListener('click', validateFields);
next_button.addEventListener('click', nextForm);
previous_button.addEventListener('click', previousForm);

//------------------------------------ Switching forms ends here

// ----------------------------------- clearing and saving in local storage
let count = 1;
let once = true;
const save_clear = document.getElementById("save-clear");
save_clear.addEventListener('click', (e) => {
  // 1) Validate all its fields
  const ExpValidFlag = validate_section(work_experience_fields);
  // 2) only if validation is confirmed and the user can save clear only three times

  if (ExpValidFlag && count < 3) {
    if (once) {//warn the user only once
      once = false;
      alert("You wont be able to edit this work experience if you want to add another");
      return;
    }
    // 3) save the values to local storage
    saveValuesToLocalStorage(work_experience_fields);
    // 4) set all the fields empty so that he/she can fill again if he/she wishes to
    setToEmpty(work_experience_fields);
    // 5) Increment count which is the nth work experience
    count++;
    // 6) changing all the field id so to add it in the next localstorage
    changeExperienceId(work_experience_fields, count);
    // 7) If the next work experience already exists, then fill fields with it
    fill_fields(work_experience_fields);
  }
});
const clearAllWE = document.getElementById('clear-all');
clearAllWE.addEventListener('click', e => {
  if (confirm('All your work-experience related data will be removed from the database, and you will have to rewrite everything again, would you like to clear all?')) {
    setToEmpty(work_experience_fields);
    RemoveWorkExperience(work_experience_fields);
    changeExperienceId(work_experience_fields, 1);
    count = 1;
  }
});
// --------------------------------------- Saving values on the localStorage
function saveValuesToLocalStorage(list) {
  for (let i = 0; i < list.length; i++) {
    localStorage.setItem(list[i].id, list[i].value);
  }
}
// --------------------------------------- function empties the fields specified in list array
function setToEmpty(list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].classList.contains("date")) {
      // sets select tag's current value to that select tag's 1st option's value(i.e. nil); 
      list[i].value = list[i].options[0].value;
      continue;
    }
    list[i].value = "";
  }
}
// --------------------------------------- function to change we ID
function changeExperienceId(list, num) {//this function will keep the id same but changes only the last number
  for (let i = 0; i < list.length; i++) {
    list[i].id = list[i].id.substring(0, list[i].id.length - 1) + num;
  }
}
// --------------------------------------- Removing values from localStroage of only WorkExperience;
// see to this code later
function RemoveWorkExperience(list) {
  for (let i = 1; i <= 3; i++) {
    for (let j = 0; j < list.length; j++) {
      //extract element's id
      const id = list[j].id.substring(0, list[j].id.length - 1);
      // remove it from the local storage
      localStorage.removeItem(id + i);
    }
  }
}
// --------------------------------------- Utility functions
function Add_RemoveClass(obj, add_class, rem_class) {
  obj.classList.remove(rem_class);
  obj.classList.add(add_class);
}
function add_class(obj, addClass) {
  obj.classList.add(addClass);
}
function remove_class(obj, rem_class) {
  obj.classList.remove(rem_class);
}
function disable_enable(list, time) {
  for (let i = 0; i < list.length; i++) {
    list[i].disabled = true;
    setTimeout(() => {
      list[i].disabled = false;
    }, time);
  }
}