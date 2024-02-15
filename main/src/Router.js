import React from 'react'   
import { Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Footer from './Layout/Footer';

function RouterNav() {
    console.log(">> RouterNav >> ");    
    return(
        <>  
            <Routes>                   
                {/* <Route exact path='*' element={<Page404 />}></Route> */}
                <Route exact path='/' element={<Home />}></Route>

            </Routes>  
            <Footer/>
        </>
    );
}


export default RouterNav;