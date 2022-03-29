const inputList = document.querySelectorAll("body .input-style"); 
fill_fields(inputList);
function fill_fields(list){
    for(let i = 0 ; i < list.length; i++){
        if(localStorage.getItem(list[i].id) != null){
            console.log('works');
            list[i].value = localStorage.getItem(list[i].id);
        }
    }
}