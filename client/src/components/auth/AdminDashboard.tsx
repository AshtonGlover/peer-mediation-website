import React from 'react';
import { useState } from "react";
import "../../styles/AdminDashboard.css"
import { getAdminLogin, getCookies } from '../../utils/api';
import { useEffect} from "react";
import Chat from "../Chat";


const AdminDashboard: React.FunctionComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [adminCredentials, setAdminCredentials] = useState<{ user: string; password: string } | null>(null);
  const [cookies, setCookies] = useState<string[]>([]);
  const [activeChat, setActiveChat] = useState("");

  useEffect(() => {
      getCookies().then((data) => {
          setCookies(data.cookies)
      });
  }, []);

  useEffect(() => {
    const fetchAdminCredentials = async () => {
      try {
        const loginInfo = await getAdminLogin();
        const [adminPassword, adminUser] = loginInfo.loginInfo.split(":");
        setAdminCredentials({ user: adminUser, password: adminPassword });
      } catch (error) {
        console.error('Failed to fetch admin credentials:', error);
      }
    };

    fetchAdminCredentials();
  }, []);

  const handleLogin = () => {
    if (adminCredentials) {
      const { user, password } = adminCredentials;
      if (user === username && password === password) {
        setIsAuthenticated(true);
        setErrorMessage('');
      } else {
        setErrorMessage('Invalid username or password. Please try again.');
      }
    }
  };

  if (isAuthenticated) {
    if (activeChat !== ""){
      return <Chat isAdmin={true} uid={activeChat} />;
    }
    return (
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <div className="emails">
          {cookies.map((cookie, index) => (
            <div key={index} className="message">
              <button onClick={() => setActiveChat(cookie.split("@")[0])}>
                {cookie}
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