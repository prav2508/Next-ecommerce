import React, { useState } from 'react';
import {Redirect} from 'react-router-dom'
import { isloggedin } from '../utils/common';
import ItemList from './ItemList';
import Navbar from './navbar';


function Home() {

    const[isLoggedIn, SetIsLogged_In] = useState(isloggedin());

    if (!isLoggedIn) {
        return <Redirect to={"/login"} />
       
    }

    return (
        <div className='container-fluid p-0'>
            <Navbar/>
            <ItemList/>
        </div>
    );
}

export default Home;