import React from 'react'   
import { Routes, Route } from 'react-router-dom';

import Footer from './Layout/Footer';
import Home from './Pages/Home';
import Sample1 from './Pages/Sample1';
import Sample2 from './Pages/Sample2';

function RouterNav() {
    console.log(">> RouterNav >> ");    
    return(
        <>  
            <Routes>                   
                {/* <Route exact path='*' element={<Page404 />}></Route> */}
                <Route exact path='/' element={<Home />}></Route>
                <Route exact path='/home' element={<Home />}></Route>
                <Route exact path='/sample1' element={<Sample1 />}></Route>
                <Route exact path='/sample2' element={<Sample2 />}></Route>

            </Routes>  
            <Footer/>
        </>
    );
}


export default RouterNav;