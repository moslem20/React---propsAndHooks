import Register from './Pages/Register'
import Login from './Pages/login'
import Profile from './Pages/Profile'
import { useEffect, useState } from 'react'
import SystemAdmin from './Pages/SystemAdmin'


export default function Home() {

     const[currentUser,setCurrentUser] = useState(null);
     const [isAdmin, setIsAdmin] = useState(false);
  
  
     useEffect(() => {
      const sessionUser = JSON.parse(sessionStorage.getItem("currentUser"));
      if (sessionUser) {
        setCurrentUser(sessionUser);
        setIsAdmin(sessionUser.userName === "admin" && sessionUser.password === "ad12343211ad");
      }
    }, []);
  return (

      <>
        {currentUser ? (
            isAdmin ? (
              <SystemAdmin setCurrentUser={setCurrentUser} />
            ) : (
              <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />
            )
          ) : (
            <>
              <Login setCurrentUser={setCurrentUser} />
              <Register />
              
            </>
          )}
        
        </>
  )
}
