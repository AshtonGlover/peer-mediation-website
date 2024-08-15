import React from 'react';
import { useState } from "react";
import "../../styles/AdminDashboard.css"
import { getCookies } from '../../utils/api';
import { useEffect} from "react";
import Chat from "../Chat";

enum Section {
  ADMIN_DASHBOARD = "ADMIN_DASHBOARD",
  CHAT = "CHAT"
}

const AdminDashboard: React.FunctionComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies, setCookies] = useState<string[]>([]);
  const [activeChat, setActiveChat] = useState("");

  useEffect(() => {
      getCookies().then((data) => {
          setCookies(data.cookies)
      });
  }, []);

  const handleLogin = () => {
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };

  if (isAuthenticated) {
    if (activeChat !== ""){
      return(
        <div>
          <Chat isAdmin={true} uid={activeChat} />
          <div className = "button-page">
            <button className = "back-button" onClick={() => setActiveChat("")}> Back </button>
          </div>
        </div>
      );
    }
    return (
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <div className="emails">
          {cookies.map((cookie, index) => (
            <div key={index} className="message">
              <button className = "email" onClick={() => setActiveChat(cookie.split("@")[0])}>
                {"New message at " + cookie.split("@")[1]}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="admin-login">
        <h1>Admin Login</h1>
        <div className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  }
};

export default AdminDashboard;