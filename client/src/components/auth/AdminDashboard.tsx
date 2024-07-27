import React from 'react';
import { useState } from "react";
import "../../styles/AdminDashboard.css"
import { getAdminLogin } from '../../utils/api';
import { useEffect} from "react";


const AdminDashboard: React.FunctionComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [adminCredentials, setAdminCredentials] = useState<{ user: string; password: string } | null>(null);

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
    // Sample data for demonstration purposes
    const userCount = 100; // Replace with actual data
    const recentActivity = [
      { user: 'User1', action: 'logged in', timestamp: Date.now() - 10000 },
      { user: 'User2', action: 'logged out', timestamp: Date.now() - 50000 },
      // Add more activity as needed
    ];

    return (
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>

        <section className="welcome-message">
          <h2>Welcome, Admin!</h2>
          <p>Here’s an overview of the latest activity and user statistics.</p>
        </section>

        <section className="user-stats">
          <h2>User Statistics</h2>
          <p>Total Users: {userCount}</p>
          {/* Add more statistics as needed */}
        </section>

        <section className="recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            {recentActivity.map((activity, index) => (
              <li key={index}>
                <strong>{activity.user}</strong> {activity.action} at {new Date(activity.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        </section>
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