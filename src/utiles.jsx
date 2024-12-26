export const loadUsers = () => {
  const adminUser = {
    userName: "admin",
    password: "ad12343211ad",
  };

  try {
    const users = JSON.parse(localStorage.getItem("users"));
    if (!Array.isArray(users)) {
      // If data is not an array, initialize with only the admin user
      localStorage.setItem("users", JSON.stringify([adminUser]));
      return [adminUser];
    }

    const isAdminPresent = users.some((user) => user.userName === adminUser.userName);
    if (!isAdminPresent) {
      users.push(adminUser);
      localStorage.setItem("users", JSON.stringify(users));
    }

    return users;
  } catch (error) {
    console.error("Failed to load users from localStorage:", error);
    // If an error occurs, initialize with only the admin user
    localStorage.setItem("users", JSON.stringify([adminUser]));
    return [adminUser];
  }
};



//לשמור את המשתמשים ב localStorage
export const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const registerUser = (user) => {
  const users = loadUsers();
  saveUsers([...users, user]);
};

export const loginUser = (userName, password) => {
  const users = loadUsers();
  return users.find((user) => user.userName === userName && user.password === password);
};


export const logoutUser = (email) => {
  let users = loadUsers();
  users = users.filter((user) => user.email !== email);
  saveUsers(users);
};

export const editUser = (updatedUser) => {
  let users = loadUsers();
  users = users.map((user) => (user.email === updatedUser.email ? updatedUser : user));
  saveUsers(users);
};