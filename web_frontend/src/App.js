import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import WebPortal from './pages/WebPortal';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Community from './pages/Community';
import Dashboard from './pages/Dashboard';
import Notification from './pages/Notification';
import Terms from './pages/Terms';
import RequestBlood from './pages/RequestBlood';
import Profile from './pages/Profile/Profile';
import ChangePassword from './pages/Profile/ChangePassword';
import RequestHistory from './pages/Profile/RequestHistory'
import ProfileDetails from './pages/Profile/ProfileDetails';
import EditProfile from './pages/Profile/EditProfile';
import AdminDashboard from './pages/Admin/AdminDashboard';
import RegisteredUsers from './pages/Admin/RegisteredUsers';
import RegisteredHospitals from './pages/Admin/RegisteredHospitals';
import Inquiries from './pages/Admin/Inquiries';
import AdminSideBar from './pages/Admin/AdminSideBar';
import FindDonorsPage from './pages/FindDonors';
import RequestDetailsPage from './pages/BloodRequestDetails';


function App() {
  return(
    <Router>
      <Routes>
        <Route path ="/" element={<Home/>}/>
        <Route path ="/login" element={<Login/>}/>
        <Route path='/webPortal' element ={<WebPortal/>}/>
        <Route path='/registration' element ={<Registration/>}/>
        <Route path ="/community" element={<Community/>}/>
        <Route path ="/dashboard" element={<Dashboard/>}/>
        <Route path ="/notification" element={<Notification/>}/>
        <Route path='/terms' element ={<Terms/>}/>
        <Route path ='/request-blood' element={<RequestBlood/>}/>
        <Route path = '/profile' element = {<Profile/>}/>
        <Route path ='/changePassword' element={<ChangePassword/>}/>
        <Route path = '/requestHistory' element={<RequestHistory/>}/>
        <Route path ="/profileDetails" element={<ProfileDetails/>}/>
        <Route path ="/editProfile" element={<EditProfile/>}/>
        <Route path ="/adminDashboard" element={<AdminDashboard/>}/>
        <Route path ="/adminRegisteredUsers" element={<RegisteredUsers/>}/>
        <Route path ="/adminRegisteredHospitals" element={<RegisteredHospitals/>}/>
        <Route path ="/adminInquiries" element={<Inquiries/>}/>
        <Route path="/adminSidebar" element={<AdminSideBar/>}/>
        <Route path="/findDonors" element = {<FindDonorsPage/>}/>
        <Route path="/requests/:id" element={<RequestDetailsPage />} />
      </Routes>
    </Router>
  )
}

export default App