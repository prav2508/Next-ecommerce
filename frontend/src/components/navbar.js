import { Button, Popover, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import {LogOut,CheckCircle ,ShoppingCart,Book} from 'react-feather'
import { Link } from 'react-router-dom';
import "antd/dist/antd.css";
import {getusername,gettoken} from '../utils/common'



function Navbar() {
const [title,setTitle] = useState('')
const [cartlist,setCartlist] = useState({})

useEffect(()=>{
  const requestOptions = {
    method: 'POST',
    headers: { 'Authorization':'Bearer '+gettoken(),'mode':'no-cors','Content-Type':'application/json'},
    body:JSON.stringify({username: getusername()})
    
};

fetch('/basic/api/user/cart', requestOptions)
.then(response => response.json())
.then(data => setCartlist(data));

},[cartlist])

const openNotification = () => {
  const args = {
    message: 'Order Confirmation',
    description:
      'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
    duration: 3,
  };
  notification.open(args);
};


const cart_toast = ()=>{
  setTitle('Cart')
 
console.log(cartlist)
}
const orders_toast = ()=>{
  setTitle('Orders')
}

  const text = <span className='lead'>{title}</span>;
const cart_content = (
  <div>
  {cartlist.item && cartlist.item.map((key)=>(
                             <div>     
                         <li key={key.id}>  <span className="lead">{key.name}</span>        </li>         
<hr/>
</div>
                              ))}

  </div>
);

const order_content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
    return (
        <div className='container-fluid p-0'>
              <nav className="navbar primary-navbar">
        
          <span className="navbar-brand mx-3 h1 lead">NEXT</span>
          <div className="" style={{width:'550px'}}> 
         
        <Button className="mx-3" onClick={(e)=>openNotification()}>Checkout &nbsp;<CheckCircle color="black" size={20}/></Button>
      

      <Popover placement="bottom" title={text} content={cart_content} trigger="click">
        <Button className="mx-3 " onClick={(e)=>cart_toast()}>Cart &nbsp;<ShoppingCart color="black" size={20}/></Button>
      </Popover>

      <Popover placement="bottom" title={text} content={order_content} trigger="click">
        <Button className="mx-3" onClick={(e)=>orders_toast()}>Orders &nbsp; <Book color="black" size={20}/></Button>
      </Popover>
      
        <Link className="mx-5" to={"/logout"}><LogOut color="white" /></Link>
          </div>
         
        </nav>

 



        
        </div>
       
     
      
    );
}

export default Navbar;