import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import WebPortal from './pages/WebPortal';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
  return(
    <Router>
      <Routes>
        <Route path ="/" element={<Home/>}/>
        <Route path ="/login" element={<Login/>}/>
        <Route path='/webPortal' element ={<WebPortal/>}/>
        <Route path='/registration' element ={<Registration/>}/>
      </Routes>
    </Router>
  )
}

export default App