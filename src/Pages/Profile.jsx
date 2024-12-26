import React, { useState } from 'react'
import { loadUsers, logoutUser } from '../utiles';
import { useNavigate } from 'react-router-dom';
import EditDetails from './EditDetails';

export default function Profile(props) {
  
  const { currentUsers, setCurrentUser } = props;

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  //const [formData, setFormData] = useState(currentUser);

  /*const[user,setUser] = useState({
    userName:'',
    firstName:'',
    lastName:'',
    email:'',
    image:'',
    city:'',
    street:'',
    number: 0,

  })*/
    const navigate = useNavigate();
    


    const handleLogout = () => {
      sessionStorage.removeItem("currentUser");
      logoutUser(currentUser.email);
      setCurrentUser(null);
      alert("loging out...")
      go2Login();
    };

    const handleExternalLink = () => {
      window.location.href = "https://www.ea.com/games/ea-sports-fc/fc-24";
    };

    
    

    const go2Edit = (e) =>{
      navigate('/EditDetails');
      return <EditDetails currentUser ={currentUser}/>
    }
    const go2Login = () =>{
      navigate('/Login');
    }

    

    return (
      <div className="profile-card">
        <h2>Welcome, {currentUser.userName}</h2>


        <div className="profile-info">
          <img src={currentUser.image}/>
          <p>
            <span>Full Name:</span> {currentUser.firstName} {currentUser.lastName}
          </p>
          <p>
            <span>Email:</span> {currentUser.email}
          </p>
          
          <p>
            <span>Address:</span>{currentUser.street} {currentUser.number},{currentUser.city}
          </p>

        </div>


        <div className="actions">
          <button className="edit" onClick={go2Edit}>Edit Details</button>
          <button className='game' onClick={handleExternalLink}>Game</button>
          <button className="logout" onClick={handleLogout} >
            Logout
          </button>
          
        </div>
      </div>
    );
  
}
