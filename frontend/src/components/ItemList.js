import React, { useEffect, useState } from 'react';

import { login_service } from '../utils/common';
function ItemList() {
    
    const [itemlist, setItemList] = useState([])

    
       
    useEffect(() => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImV4cCI6MTYyMjgxODgyMywiaWF0IjoxNjIyODExNjIzfQ.2TfbgtDNOtmyN28jTAUgJbEnLdjqr0v_f3VP3pfCTNA' ,'mode':'no-cors'}
            
        };
    
        fetch('/basic/api/item/list', requestOptions)
        .then(response => response.json())
        .then(data => setItemList(data));
        //console.log(login_service("user1","user@123"))
        
                }, [])
    
    return (
        <div className="container-fluid p-0 m-0">
            <div className='row p-3 m-2'>
                
            {itemlist && itemlist.map((key)=>(
                                  
                                  
                                   <div className="card p-2 m-3" style={{ width: "20rem" }}>
                    <img src={key.url} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <hr></hr>
                        <h5 className="card-title display-1 fs-2">{key.name}</h5>
                        <br></br>
                        <label className="lead"><small>Price</small></label>
                        <span className="lead font-italic fs-3">{key.price+' /-'}</span>
                        <p className="card-text"></p>
                        <a href="" className="btn btn-dark float-end">Add to cart</a>
                    </div>
                </div>
                                  
                                
                                   
                                  

                               ))}


            </div>
        </div>
    );
}

export default ItemList;