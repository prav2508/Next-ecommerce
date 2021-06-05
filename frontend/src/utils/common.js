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

    fetch('https://next-ecomm.herokuapp.com/basic/api/user/login', requestOptions)
        .then(response => response.json())
        .then(data => 
            
            data.jwt_token?sessionStorage.setItem("next_user",JSON.stringify(data)):alert("Invalid username or password"));


}   


export const isloggedin = ()=>{
    if(sessionStorage.getItem('next_user')){
        return true
    }else{
        return false
    }
}

export const gettoken = ()=>{
    if(sessionStorage.getItem('next_user')){
       
        const token = JSON.parse(sessionStorage.getItem('next_user')).jwt_token

        return token
    }
}

export const getusername = ()=>{
    if(sessionStorage.getItem('next_user')){
       
        const username = JSON.parse(sessionStorage.getItem('next_user')).username

        return username
    }
}

export const getpassword = ()=>{
    if(sessionStorage.getItem('next_user')){
      
        const pass = JSON.parse(sessionStorage.getItem('next_user')).password

        return pass
    }
}

export const getcartid = ()=>{
    if(sessionStorage.getItem('next_user')){
      
        const cartid = JSON.parse(sessionStorage.getItem('next_user')).cart.id

        return cartid
    }
}

export const logout = ()=> {
    sessionStorage.removeItem('next_user')
}