import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { editUser, loadUsers, logoutUser } from '../utiles';

export default function SystemAdmin(props) {
  const [users, setUsers] = useState(loadUsers().filter(user => user.userName !== 'admin'));
  const navigate = useNavigate();

  const deleteUsers = (email) => {
    logoutUser(email);
    setUsers(loadUsers().filter(user => user.userName !== 'admin'));
    alert('User removed successfully');
  };

  const go2Edit = (user) => {
    
    navigate('/EditDetails');
  };

  const editUsers = (user) => {
    if (user.userName === 'admin') {
      alert('Cannot edit the admin');
    } else {
      editUser(user);
      go2Edit(user);
      setUsers(loadUsers().filter(user => user.userName !== 'admin'));
    }
  };

  return (
    <div>
      <h2>System Admin</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Full Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.userName}</td>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.birthDate}</td>
              <td>{user.email}</td>
              <td>
                <button className="delete-button" onClick={() => deleteUsers(user.email)}>Delete</button>
                <button className="edit-button" onClick={() => editUsers(user)}>Edit Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
