import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import UsersForm from "./components/UsersForm.jsx";
import UsersList from "./components/UsersList.jsx";
import { useState, useEffect } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const showFeedback = (message, type) => {
    setFeedback({ message, type });
    setTimeout(() => {
      setFeedback({ message: "", type: "" });
    }, 3000);
  };

  const addUser = (user) => {
    const newUser = { 
      ...user, 
      id: Date.now(),
      status: "active",
      createdAt: new Date().toLocaleString()
    };
    setUsers([...users, newUser]);
    showFeedback("Client created successfully! ✅", "success");
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
    showFeedback("Client deleted successfully! ❌", "success");
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    ));
    showFeedback("Client updated successfully! ✅", "success");
  };

  const toggleUserStatus = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user
    ));
  };

  return (
    <div>
      {feedback.message && (
        <div className={`feedback-message ${feedback.type}`}>
          {feedback.message}
        </div>
      )}
      <Navbar />
      <Routes>
        <Route path="/" element={<UsersList users={users} deleteUser={deleteUser} toggleUserStatus={toggleUserStatus} />} />
        <Route path="/create-user" element={<UsersForm addUser={addUser} />} />
        <Route path="/edit-user/:id" element={<UsersForm users={users} updateUser={updateUser} />} />
      </Routes>
    </div>
  );
};

export default App;