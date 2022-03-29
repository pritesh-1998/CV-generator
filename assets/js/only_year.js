for(let i = 1 ; i <= 3; i++){
    if(localStorage.getItem("start-year"+i) != "nil"){
        console.log("here : "+i);
        let Syear = localStorage.getItem("start-year"+i);
        let Eyear = localStorage.getItem("end-year"+i);
        document.getElementById("start-end-date-"+i).textContent = Syear + " - " +Eyear;
    }
}
