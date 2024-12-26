import React, { useState } from 'react';
import { registerUser } from '../utiles';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';

export default function Register() {
  const cities = [
    'Tel Aviv',
    'Jerusalem',
    'Haifa',
    'Rishon LeZion',
    'Petah Tikva',
    'Ashdod',
    'Netanya',
    'Beersheba',
    'Holon',
    'Bnei Brak',
    'Rehovot',
    'Bat Yam',
    'Ramat Gan',
    'Ashkelon',
    'Herzliya',
    'Kfar Saba',
    'Hadera',
    'Ra’anana',
    'Modi’in-Maccabim-Re’ut',
    'Eilat',
];

  // Validation regex
  const regex = /^[A-Za-z]*$/;
  const eRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [form, setForm] = useState({
    userName: "",
    password: "",
    conPassword: "",
    image: "",     
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    city: "",
    street: "",
    number: "",
  });

  // Store error messages
  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState([]);

  const validate = () => {
    const errors = {};
    if (form.userName.length === 0 || form.userName.length > 60) {
      errors.userName = 'Username must be between 1 and 60 characters.';
    }

    if (
      form.password.length < 7 ||
      form.password.length > 12 ||
      !/[A-Z]/.test(form.password) ||
      !/[!@#$%&-]/.test(form.password)
    ) {
      errors.password = 'Password must be 7-12 characters, include one uppercase letter, and one special character.';
    }

    if (form.conPassword !== form.password) {
      errors.conPassword = "Passwords don't match.";
    }

    if (!regex.test(form.firstName)) {
      errors.firstName = 'First name should not contain numbers.';
    }

    if (!regex.test(form.lastName)) {
      errors.lastName = 'Last name should not contain numbers.';
    }

    if (!eRegex.test(form.email)) {
      errors.email = 'Enter a valid email address.';
    }

    const birthDateObj = new Date(form.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDateObj.getFullYear();
    if (age < 18 || age > 120 || isNaN(birthDateObj.getTime())) {
      errors.birthDate = 'Enter a valid birth date (age 18-120).';
    }

    if (form.street.trim() === "") {
      errors.street = 'Street name cannot be empty.';
    }

    const numberValue = Number(form.number);
    if (isNaN(numberValue) || numberValue <= 0) {
      errors.number = 'Enter a valid positive number.';
    }

    return errors;
  };

  const navigate = useNavigate();

        const go2Login = () =>{
              navigate('/Login');
            }
        
  const handleRegister = (e) => {
    e.preventDefault(); 
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    registerUser(form);
    alert("User registered successfully!");
    go2Login();
    console.log("Form data:", form);
    return <Profile currentUser={form} setCurrentUser={setForm}/>
     
  };

  const handleCityChange = (e) => {
    const input = e.target.value;
    setForm({ ...form, city: input });

    // Filter suggestions
    const filteredSuggestions = cities.filter((city) =>
      city.toLowerCase().startsWith(input.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const selectSuggestion = (city) => {
    setForm({ ...form, city });
    setSuggestions([]);
  };

  

  return (
    <form >
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setForm({ ...form, userName: e.target.value })}
        required
      />
      {errors.userName && <p>{errors.userName}</p>}
      <br />
      
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      {errors.password && <p>{errors.password}</p>}
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setForm({ ...form, conPassword: e.target.value })}
        required
      />
      {errors.conPassword && <p>{errors.conPassword}</p>}
      <input
        type="text"
        placeholder="Image URL"
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />
      <br />
      <input
        type="text"
        placeholder="First Name"
        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        required
      />
      {errors.firstName && <p>{errors.firstName}</p>}
      <input
        type="text"
        placeholder="Last Name"
        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        required
      />
      {errors.lastName && <p>{errors.lastName}</p>}
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <br />
      {errors.email && <p>{errors.email}</p>}
      <label> Birth Date: </label>
      <input
        type="date"
        placeholder="Birth Date"
        onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
        required
      />
      {errors.birthDate && <p>{errors.birthDate}</p>}


      <input
        type="text"
        placeholder="City"
        value={form.city}
        onChange={handleCityChange}
        required
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((city, index) => (
            <li key={index} onClick={() => selectSuggestion(city)}>
              {city}
            </li>
          ))}
        </ul>
      )}
      {errors.city && <p>{errors.city}</p>}

      <input
        type="text"
        placeholder="Street"
        onChange={(e) => setForm({ ...form, street: e.target.value })}
        required
      />
      {errors.street && <p>{errors.street}</p>}
      <input
        type="text"
        placeholder="Number"
        onChange={(e) => setForm({ ...form, number: e.target.value })}
        required
      />
      {errors.number && <p>{errors.number}</p>}
      <br />
      <button onClick={handleRegister}>Register</button>
    </form>
  );
}
