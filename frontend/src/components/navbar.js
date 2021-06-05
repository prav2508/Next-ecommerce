import { Button, Popover, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { LogOut, CheckCircle, ShoppingCart, Book } from 'react-feather'
import { Link } from 'react-router-dom';
import "antd/dist/antd.css";
import { getusername, getpassword,gettoken,getcartid, login_service } from '../utils/common'



function Navbar() {
  const [title, setTitle] = useState('')
  const [cartlist, setCartlist] = useState({})
  const [cartdetail, setCartDetail] = useState({})
  const [orderlist, setOrderlist] = useState([])


  const getusercartdetails = ()=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + gettoken(), 'mode': 'no-cors', 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: getusername() })

    };

    fetch('/basic/api/user/cart', requestOptions)
      .then(response => response.json())
      .then(data => setCartDetail(data));
  }

  useEffect(() => {
    
    getusercartdetails();

    const requestpOptions = {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + gettoken(), 'mode': 'no-cors', 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: getusername() })
    };

    fetch('/basic/api/order/listbyusername', requestpOptions)
      .then(response => response.json())
      .then(data => setOrderlist(data));

  }, [cartdetail])

  const checkout = () => {

    getusercartdetails();

    if(cartdetail.item.length>0){
      const requestpOptions = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + gettoken(), 'mode': 'no-cors', 'Content-Type': 'application/json' },
        body: JSON.stringify({ jwt: gettoken() })
      };
  
      fetch('/basic/api/cart/'+cartdetail.id+'/complete', requestpOptions)
        .then(response => response.json())
        .then(data => console.log(data));
      const args = {
          message: 'Order Confirmation',
          description:
            'Thanks for shopping, your order has been placed successfully!!!',
          duration: 3,
        };
        notification.open(args);
    }else{
      
      const args = {
        message: 'Order Cannot be placed',
        description:
          'No Items in Cart!!!',
        duration: 3,
      };
      notification.open(args);
    }
   

    
   

    

  };


  const cart_toast = () => {
    setTitle('Cart')
    const requestOptions = {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + gettoken(), 'mode': 'no-cors', 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: getusername() })

    };

    fetch('/basic/api/user/cart', requestOptions)
      .then(response => response.json())
      .then(data => setCartlist(data));

  }



  const orders_toast = () => {
    setTitle('Orders')
 const requestpOptions = {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + gettoken(), 'mode': 'no-cors', 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: getusername() })
    };

    fetch('/basic/api/order/listbyusername', requestpOptions)
      .then(response => response.json())
      .then(data => setOrderlist(data));
  
  }

  const text = <span className='font-weight-bold'>{title}</span>;
  const cart_content = (
    <div>
      <span>{cartlist.id?'Cart ID: '+cartlist.id:''}</span>
      {cartlist.item && cartlist.item.map((key) => (
        <div>
          <li key={key.id}>  <span className="lead">{key.name}</span>        </li>
          <hr />
        </div>
      ))}

    </div>
  );

  const order_content = (
    <div>
    {orderlist && orderlist.map((key) => (
      <div>
        <li key={key.id}>  <span className="lead">{'Order-ID '+key.id}</span>        </li>
        <hr />
      </div>
    ))}

  </div>
  );
  return (
    <div className='container-fluid p-0'>
      <nav className="navbar primary-navbar">

        <span className="navbar-brand mx-3 h1 lead">NEXT</span>
        <div className="" style={{ width: '550px' }}>

          <Button className="mx-3" onClick={(e) => checkout()}>Checkout &nbsp;<CheckCircle color="black" size={20} /></Button>


          <Popover placement="bottom" title={text} content={cart_content} trigger="click">
            <Button className="mx-3 " onClick={(e) => cart_toast()}>Cart &nbsp;<ShoppingCart color="black" size={20} /></Button>
          </Popover>

          <Popover placement="bottom" title={text} content={order_content} trigger="click">
            <Button className="mx-3" onClick={(e) => orders_toast()}>Orders &nbsp; <Book color="black" size={20} /></Button>
          </Popover>

          <Link className="mx-5" to={"/logout"}><LogOut color="white" /></Link>
        </div>

      </nav>






    </div>



  );
}

export default Navbar;