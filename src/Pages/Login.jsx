import React, { useState } from 'react'
import { loginUser, saveUsers } from '../utiles';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import App from '../App';

export default function Login(props) {

  const { setCurrentUser } = props;

  const [loginForm, setLoginForm] = useState({
    userName: "",
    password: "",
  });



 /* // Store error messages
  const [errors, setErrors] = useState({});


  const validate = () => {
    const errors = {};
    if (loginForm.userName.length === 0 || loginForm.userName.length > 60) {
      errors.userName = 'Username must be between 1 and 60 characters.';
    }

    if (
      loginForm.password.length < 7 ||
      loginForm.password.length > 12 ||
      !/[A-Z]/.test(loginForm.password) ||
      !/[!@#$%&-]/.test(loginForm.password)
    ) {
      errors.password = 'Password must be 7-12 characters, include one uppercase letter, and one special character.';
    }
    return errors;

  }*/
    const navigate = useNavigate();
    

  const handleLogin = (e) => {
  e.preventDefault(); // Prevent page reload
  const user = loginUser(loginForm.userName, loginForm.password);
  
  if (user) {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    alert(user.userName === "admin" ? "Admin logged in successfully!" : "User logged in successfully!");
    console.log('Logged in user:', user);
    navigate('/');
  }
  else {
    alert('Invalid username or password.');
  }
};


  const go2reg = () => {
    navigate('/Register');
  }


  return (
    <form>
      <h2>Log In</h2>
      <input
        type='text'
        placeholder='user name'
        onChange={(e) => setLoginForm({ ...loginForm, userName: e.target.value })}

      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}

      />

      <button onClick={handleLogin}>log in</button><br />
      <p>dont have an account?</p>
      <button className='reg-button' onClick={go2reg}>Register</button>
    </form>
  )
}
