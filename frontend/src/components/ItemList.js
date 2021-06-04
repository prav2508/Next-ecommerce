import React, { useEffect, useState } from 'react';
import "antd/dist/antd.css";
import { notification } from 'antd';


import { login_service,isloggedin, gettoken,getusername } from '../utils/common';
function ItemList() {
    
    const [itemlist, setItemList] = useState([])

    const [islogged_in,SetIsLogged_In] = useState( isloggedin())
    const [cartlist,setCartlist] = useState({})
    // const[token,setToken] = useState(gettoken())
    useEffect(() => {
       

        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization':'Bearer '+gettoken(),'mode':'no-cors'}
            
        };
    
        fetch('/basic/api/item/list', requestOptions)
        .then(response => response.json())
        .then(data => setItemList(data));
       
        const requestpOptions = {
            method: 'POST',
            headers: { 'Authorization':'Bearer '+gettoken(),'mode':'no-cors','Content-Type':'application/json'},
            body:JSON.stringify({username: getusername()})
            
        };
        
        fetch('/basic/api/user/cart', requestpOptions)
        .then(response => response.json())
        .then(data => setCartlist(data));
                }, [cartlist])

                const openNotification = () => {
                    const args = {
                      message: 'Added to Cart',
                      description:
                        'Your selected item has been added to cart!',
                      duration: 2,
                    };
                    notification.open(args);
                  };
const addtocart = (itemid)=>{

    const requestOptions = {
        method: 'POST',
        headers: { 'Authorization':'Bearer '+gettoken(),'mode':'no-cors','Content-Type':'application/json'},
        body:JSON.stringify({cart_id: cartlist.id,item_id:itemid,jwt:gettoken()})
        
    };
    
    fetch('/basic/api/cart/add', requestOptions)
    .then(response => response.json())
    .then(data => setCartlist(data));
    openNotification()
}

    
    return (
        <div className="container-fluid p-0 m-0">
            <div className='row p-3 m-2'>
                
            {itemlist && itemlist.map((key)=>(
                                  
                                  
                                   <div className="card p-2 m-3" key={key.id} style={{ width: "20rem" }}>
                    <img src={key.url} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <hr></hr>
                        <h5 className="card-title lead fs-4">{key.name}</h5>
                        <br></br>
                        <label className="lead"><small>Price.</small></label>
                        <span className="lead font-italic fs-3">{" "+key.price+' /-'}</span>
                        <p className="card-text"></p>
                        <button className="btn btn-dark float-end" onClick={(e)=>addtocart(key.id)}>Add to cart</button>
                    </div>
                </div>
                                  
                                
                                   
                                  

                               ))}


            </div>
        </div>
    );
}

export default ItemList;