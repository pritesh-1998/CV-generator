// --------------------- Fields on which validation takes place
//required fields
const form_1 = document.querySelectorAll("#personal-section .input-style[required]");
const form_2 = document.querySelectorAll("#experience-section .input-style[required]");//required fields
//not required fields
const work_experience_fields = document.querySelectorAll("#work-exp .input-style");//not required fields
const post_grad = document.querySelectorAll("#post-grad .input-style");//not required fields
const bach_degree = document.querySelectorAll("#bach-deg .input-style");//not required fields
const reference = document.querySelectorAll("#reference .input-style");//not required fields


function validateFields(e){
    if(e.target.classList.contains("personal-form-btn")){//if the button is on the personal-form
        valid_flag = validate_section(form_1);//compulsory validation
    }
    else if(e.target.classList.contains("experience-form-btn")){//if the button is on the personal-form
        valid_flag = validate_section(form_2);//compulsory validation
        // below functions will test if these form section have any feilds filled 
        // if filled then validation takes place on each and determines if valid or not
        let flag_we =CheckFilledAndThenValidate(work_experience_fields);
        let flag_pg =CheckFilledAndThenValidate(post_grad);
        let flag_bd =CheckFilledAndThenValidate(bach_degree); 
        let flag_ref =CheckFilledAndThenValidate(reference); 

        if(!flag_we || !flag_pg || !flag_bd || !flag_ref){
            valid_flag = false;
            
        }
    }
}

// Actual Validation
function validate_section(form){//returns bool value weather it is valid or not
    let flag = true;
    for(let i = 0; i < form.length;i++){
        if(isDate(form[i]) && form[i].value == "nil"){
            flag = false;
            indicateInvalid(form[i]);
            continue;
        }
        else if(isFilled(form[i].value)){
            if(form[i].classList.contains("number")){
                if(isNum(form[i].value) && (form[i].value.length == form[i].maxLength)){
                    continue;
                }
                else{
                    flag = false;
                    indicateInvalid(form[i]);
                }
            }
            continue;
        }
        flag = false;
        indicateInvalid(form[i]);
    }
    return flag;
}
function CheckFilledAndThenValidate(form){
    let flag = true;
    for(let i=0;i<form.length;i++){
        if(isDate(form[i]) && form[i].value != "nil"){
            console.log("here");
            flag = validate_section(form);
            console.log(flag);
            return flag;
        }
        else if(isFilled(form[i].value) && !isDate(form[i])){
            console.log("here");
            flag = validate_section(form);
            return flag;
        }
    }
    return flag;
}
// Utility Functions
function isFilled(str){
    if(str.trim() != ""){
        return true;
    }
    return false;
}
function isNum(str){
    if(isNaN(str)){
        return false
    }
    return true;
}
function isDate(obj){
    if(obj.classList.contains("date")){
        return true;
    }
    return false;
}
function indicateInvalid(fieldObj){
    fieldObj.classList.add("invalid");
    setTimeout(()=>{
        fieldObj.classList.remove("invalid");
    },3000);
}
