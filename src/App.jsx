import './App.css'
import Register from './Pages/Register'
import Login from './Pages/login'
import Profile from './Pages/Profile'
import EditDetails from './Pages/EditDetails'
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import SystemAdmin from './Pages/SystemAdmin'
import { loadUsers, registerUser } from './utiles'

function App() {
   const[currentUser,setCurrentUser] = useState(null);
   const [isAdmin, setIsAdmin] = useState(false);
   const location = useLocation(); 
   const navigate = useNavigate();


   useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (sessionUser) {
      setCurrentUser(sessionUser);
      setIsAdmin(sessionUser.userName === "admin" && sessionUser.password === "ad12343211ad");
    }
  }, []);

  const refresh =()=>{
    navigate("/");
  }
  
  const isDefaultRoute = location.pathname === "/"; 

  return (
    <>
      {isDefaultRoute && (
        <>
          <header style={{ padding: '20px 0', marginBottom: '20px' }}>
            <h1>React Hooks & Props</h1>
            <h3>מוסלם מסארוה</h3>
          </header>
          <nav>
            <Link to="/login">Log In</Link> | <Link to="/register">Register</Link> |{' '}
            <Link to="/profile">Profile</Link> | <Link to="/editdetails">Edit Details</Link>
          </nav>
        </>
      )}
      <Routes>
        <Route path="/" element={isDefaultRoute && (
          currentUser ? (
            isAdmin ? (
              <SystemAdmin setCurrentUser={setCurrentUser} />
            ) : (
              <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />
            )
          ) : (
            <Login setCurrentUser={setCurrentUser} />
          )
        )} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/editdetails" element={<EditDetails currentUser={currentUser} />} />
        <Route path="/systemadmin" element={<SystemAdmin setCurrentUser={setCurrentUser} />} />
      </Routes>
    </>
  );
}

export default App
