import axios from "axios";

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export const  t_date = ()=>{
    const date = new Date();

    return {
        "day":days[date.getDay()],
        "text_month":months[date.getMonth()],
        "month":date.getMonth()+1,
        "date":date.getUTCDate(),
        "year":date.getFullYear(),
    };
}

export const  login_service = (username,password)=>{
   
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username,password:password })
    };

    fetch('http://localhost:8080/basic/api/user/login', requestOptions)
        .then(response => response.json())
        .then(data => sessionStorage.setItem("next_user",JSON.stringify(data)));


}   