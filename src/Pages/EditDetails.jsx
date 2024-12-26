import React, { useState } from 'react'
import { editUser, loadUsers } from '../utiles';
import { useNavigate } from 'react-router-dom';

export default function EditDetails(props) {
 const { currentUser } = props;
 

  // Validation regex
    const regex = /^[A-Za-z]*$/;
    //const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    const [editForm, setEditForm] = useState(currentUser/*{
      userName: "",
      password: "",
      conPassword: "",
      image: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      city: "",
      street: "",
      number: "",
      
    }*/);

      // Store error messages
      const [errors, setErrors] = useState({});
    
      const validate = () => {
        const errors = {};
        if (editForm.userName.length === 0 || editForm.userName.length > 60) {
          errors.userName = 'Username must be between 1 and 60 characters.';
        }
    
        if (
          editForm.password.length < 7 ||
          editForm.password.length > 12 ||
          !/[A-Z]/.test(editForm.password) ||
          !/[!@#$%&-]/.test(editForm.password)
        ) {
          errors.password = 'Password must be 7-12 characters, include one uppercase letter, and one special character.';
        }
    
        if (editForm.conPassword !== editForm.password) {
          errors.conPassword = "Passwords don't match.";
        }
    
        if (!regex.test(editForm.firstName)) {
          errors.firstName = 'First name should not contain numbers.';
        }
    
        if (!regex.test(editForm.lastName)) {
          errors.lastName = 'Last name should not contain numbers.';
        }
    
        const birthDateObj = new Date(editForm.birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDateObj.getFullYear();
        if (age < 18 || age > 120 || isNaN(birthDateObj.getTime())) {
          errors.birthDate = 'Enter a valid birth date (age 18-120).';
        }
    
        if (editForm.street.trim() === "") {
          errors.street = 'Street name cannot be empty.';
        }
    
        const numberValue = Number(editForm.number);
        if (isNaN(numberValue) || numberValue <= 0) {
          errors.number = 'Enter a valid positive number.';
        }
    
        return errors;
      };

      const handleEdit = (e) => {
          e.preventDefault(); 
          const validationErrors = validate();
          if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
          }
          editUser(editForm);
          
          alert("User edited successfully!\nLog in to see changes");
          go2Login();
          console.log("editForm data:", editForm);
           
        };

        const navigate = useNavigate();

        const go2Login = () =>{
              navigate('/Login');
            }
        
           /* if (loadUsers()) {
              return( 
              <button onClick={go2Login}>Please log in first to view your profile.</button>
              );
            }*/

        return (
          <form className='editForm' style={{backgroundColor:'#2F4F4F'}} >
            <h2>Edit your info</h2>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setEditForm({ ...editForm, userName: e.target.value })}
              required
            />
            {errors.userName && <p>{errors.userName}</p>}
            <br />
            
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
              required
            />
            {errors.password && <p>{errors.password}</p>}
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setEditForm({ ...editForm, conPassword: e.target.value })}
              required
            />
            {errors.conPassword && <p>{errors.conPassword}</p>}
            <input
              type="text"
              placeholder="Image URL"
              onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
            />
            <br />
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
              required
            />
            {errors.firstName && <p>{errors.firstName}</p>}
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
              required
            />
            {errors.lastName && <p>{errors.lastName}</p>}

            <label> Birth Date: </label>
            <input
              type="date"
              placeholder="Birth Date"
              onChange={(e) => setEditForm({ ...editForm, birthDate: e.target.value })}
              required
            />
            {errors.birthDate && <p>{errors.birthDate}</p>}
            <input
              type="text"
              placeholder="City"
              onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Street"
              onChange={(e) => setEditForm({ ...editForm, street: e.target.value })}
              required
            />
            {errors.street && <p>{errors.street}</p>}
            <input
              type="text"
              placeholder="Number"
              onChange={(e) => setEditForm({ ...editForm, number: e.target.value })}
              required
            />
            {errors.number && <p>{errors.number}</p>}
            <br />
            <button onClick={handleEdit}>Edit details</button>
          </form>
        );
}
